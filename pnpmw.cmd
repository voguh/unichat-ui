<# : batch portion
@REM ******************************************************************************
@REM  Copyright (c) 2026 Voguh
@REM
@REM  This program and the accompanying materials are made
@REM  available under the terms of the Eclipse Public License 2.0
@REM  which is available at https://www.eclipse.org/legal/epl-2.0/
@REM
@REM  SPDX-License-Identifier: EPL-2.0
@REM ******************************************************************************

@REM ----------------------------------------------------------------------------
@REM pnpm Wrapper startup batch script
@REM
@REM Optional ENV vars
@REM   PNPM_USER_HOME - base dir for the downloaded distributions (default: ~/.pnpm)
@REM   PNPMW_REPOURL - registry url base for downloading the pnpm distribution
@REM   PNPMW_VERBOSE - true: enable verbose log; others: silence the output
@REM ----------------------------------------------------------------------------

@IF "%__PNPMW_ARG0_NAME__%"=="" (SET __PNPMW_ARG0_NAME__=%~nx0)
@SET __PNPMW_CMD__=
@SET __PNPMW_PSMODULEP_SAVE=%PSModulePath%
@SET PSModulePath=
@FOR /F "usebackq tokens=1* delims==" %%A IN (`powershell -noprofile "& {$scriptDir='%~dp0'; $script='%__PNPMW_ARG0_NAME__%'; icm -ScriptBlock ([Scriptblock]::Create((Get-Content -Raw '%~f0'))) -NoNewScope}"`) DO @(
  IF "%%A"=="PNPM_CMD" (set __PNPMW_CMD__=%%B) ELSE IF "%%B"=="" (echo %%A) ELSE (echo %%A=%%B)
)
@SET PSModulePath=%__PNPMW_PSMODULEP_SAVE%
@SET __PNPMW_PSMODULEP_SAVE=
@SET __PNPMW_ARG0_NAME__=
@IF NOT "%__PNPMW_CMD__%"=="" (node "%__PNPMW_CMD__%" %* & exit /b)
@echo Cannot start pnpm from wrapper >&2 && exit /b 1
@GOTO :EOF
: end batch / begin powershell #>

$ErrorActionPreference = "Stop"
if ($env:PNPMW_VERBOSE -eq "true") {
  $VerbosePreference = "Continue"
}

if (!(Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Error "The node command does not exist in PATH, so pnpmw cannot run."
}

# calculate distributionUrl, requires .pnpm/wrapper/pnpm-wrapper.properties
$distributionUrl = (Get-Content -Raw "$scriptDir/.pnpm/wrapper/pnpm-wrapper.properties" | ConvertFrom-StringData).distributionUrl
if (!$distributionUrl) {
  Write-Error "cannot read distributionUrl property in $scriptDir/.pnpm/wrapper/pnpm-wrapper.properties"
}

# apply PNPMW_REPOURL and calculate PNPMW_HOME
# pnpm home pattern: ~/.pnpm/wrapper/dists/pnpm-<version>/<hash>
if ($env:PNPMW_REPOURL) {
  $PNPMW_REPO_PATTERN = "/pnpm/-/"
  $distributionUrl = "$($env:PNPMW_REPOURL.TrimEnd('/'))$PNPMW_REPO_PATTERN$($distributionUrl -replace '^.*'+$PNPMW_REPO_PATTERN,'')"
}
$distributionUrlName = $distributionUrl -replace '^.*/',''
$distributionUrlNameMain = $distributionUrlName -replace '\.tgz$',''
$PNPM_HOME_PARENT = "$HOME/.pnpm/wrapper/dists/$distributionUrlNameMain"
if ($env:PNPM_USER_HOME) {
  $PNPM_HOME_PARENT = "$env:PNPM_USER_HOME/wrapper/dists/$distributionUrlNameMain"
}
$PNPM_HOME_NAME = ([System.Security.Cryptography.MD5]::Create().ComputeHash([byte[]][char[]]$distributionUrl) | ForEach-Object {$_.ToString("x2")}) -join ''
$PNPMW_HOME = "$PNPM_HOME_PARENT/$PNPM_HOME_NAME"

if (Test-Path -Path "$PNPMW_HOME" -PathType Container) {
  Write-Verbose "found existing PNPMW_HOME at $PNPMW_HOME"
  Write-Output "PNPM_CMD=$PNPMW_HOME/bin/pnpm.cjs"
  exit $?
}

if ($distributionUrlName -notlike "pnpm-?*.tgz") {
  Write-Error "distributionUrl is not valid, must match */pnpm-<version>.tgz, but found $distributionUrl"
}

# prepare tmp dir
$TMP_DOWNLOAD_DIR_HOLDER = New-TemporaryFile
$TMP_DOWNLOAD_DIR = New-Item -Itemtype Directory -Path "$TMP_DOWNLOAD_DIR_HOLDER.dir"
$TMP_DOWNLOAD_DIR_HOLDER.Delete() | Out-Null
trap {
  if ($TMP_DOWNLOAD_DIR.Exists) {
    try { Remove-Item $TMP_DOWNLOAD_DIR -Recurse -Force | Out-Null }
    catch { Write-Warning "Cannot remove $TMP_DOWNLOAD_DIR" }
  }
}

New-Item -Itemtype Directory -Path "$PNPM_HOME_PARENT" -Force | Out-Null

# Download and Install pnpm
Write-Verbose "Couldn't find PNPMW_HOME, downloading and installing it ..."
Write-Verbose "Downloading from: $distributionUrl"
Write-Verbose "Downloading to: $TMP_DOWNLOAD_DIR/$distributionUrlName"

$webclient = New-Object System.Net.WebClient
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$webclient.DownloadFile($distributionUrl, "$TMP_DOWNLOAD_DIR/$distributionUrlName") | Out-Null

# If specified, validate the SHA-256 sum of the pnpm distribution tarball
$distributionSha256Sum = (Get-Content -Raw "$scriptDir/.pnpm/wrapper/pnpm-wrapper.properties" | ConvertFrom-StringData).distributionSha256Sum
if ($distributionSha256Sum) {
  Import-Module $PSHOME\Modules\Microsoft.PowerShell.Utility -Function Get-FileHash
  if ((Get-FileHash "$TMP_DOWNLOAD_DIR/$distributionUrlName" -Algorithm SHA256).Hash.ToLower() -ne $distributionSha256Sum) {
    Write-Error "Error: Failed to validate pnpm distribution SHA-256, your pnpm distribution might be compromised. If you updated your pnpm version, you need to update the specified distributionSha256Sum property."
  }
}

# untar and move
& tar.exe -xzf "$TMP_DOWNLOAD_DIR/$distributionUrlName" -C "$TMP_DOWNLOAD_DIR"
if ($LASTEXITCODE -ne 0) {
  Write-Error "failed to untar"
}
Rename-Item -Path "$TMP_DOWNLOAD_DIR/package" -NewName $PNPM_HOME_NAME | Out-Null
try {
  Move-Item -Path "$TMP_DOWNLOAD_DIR/$PNPM_HOME_NAME" -Destination $PNPM_HOME_PARENT | Out-Null
} catch {
  if (! (Test-Path -Path "$PNPMW_HOME" -PathType Container)) {
    Write-Error "fail to move PNPMW_HOME"
  }
} finally {
  try { Remove-Item $TMP_DOWNLOAD_DIR -Recurse -Force | Out-Null }
  catch { Write-Warning "Cannot remove $TMP_DOWNLOAD_DIR" }
}

Write-Output "PNPM_CMD=$PNPMW_HOME/bin/pnpm.cjs"
