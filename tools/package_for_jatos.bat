@echo off
setlocal enabledelayedexpansion

REM Experiment name (parent folder):
for %%I in ("%CD%\..") do set EXP=%%~nxI
echo Experiment name: %EXP%

REM Timestamp:
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set TS=%%i

REM Output directory:
set OUTDIR=%CD%\..\packaged
if not exist "%OUTDIR%" mkdir "%OUTDIR%"

REM Temp directory:
set TMPDIR=%TEMP%\experiment_%RANDOM%
mkdir "%TMPDIR%"
echo Temp directory: %TMPDIR%

REM Create folder structure:
mkdir "%TMPDIR%\%EXP%"
mkdir "%TMPDIR%\%EXP%\stimuli"
mkdir "%TMPDIR%\%EXP%\core"
mkdir "%TMPDIR%\%EXP%\css"

REM Make .jas custom:
set PS1=%TMPDIR%\patch_jas.ps1
> "%PS1%" echo $obj = Get-Content '..\misc\ffk.jas' -Raw ^| ConvertFrom-Json
>>"%PS1%" echo $obj.data.dirName = "%EXP%"
>>"%PS1%" echo $obj.data.title = "%EXP%"
>>"%PS1%" echo $json = $obj ^| ConvertTo-Json -Depth 100
>>"%PS1%" echo [System.IO.File]::WriteAllText("%TMPDIR%\%EXP%.jas", $json, (New-Object System.Text.UTF8Encoding($false)))
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS1%"


REM Copy experiment files:
copy "..\start-experiment.html" "%TMPDIR%\%EXP%\" >nul
copy "..\config.js" "%TMPDIR%\%EXP%\" >nul
if exist "..\consent.pdf" copy "..\consent.pdf" "%TMPDIR%\%EXP%\" >nul
if exist "..\instructions.pdf" copy "..\instructions.pdf" "%TMPDIR%\%EXP%\" >nul
xcopy "..\stimuli\*" "%TMPDIR%\%EXP%\stimuli\" /E /I /Y >nul
xcopy "..\core\*" "%TMPDIR%\%EXP%\core\" /E /I /Y >nul
xcopy "..\css\*" "%TMPDIR%\%EXP%\css\" /E /I /Y >nul

REM Make package:
set ZIPBASE=%EXP%-%TS%
set ZIPFILE=%OUTDIR%\%ZIPBASE%.zip
set JZIPFILE=%OUTDIR%\%ZIPBASE%.jzip
tar -a -c -f "%ZIPFILE%" -C "%TMPDIR%" %EXP% %EXP%.jas
ren "%ZIPFILE%" "%ZIPBASE%.jzip"

echo.
echo =========================
echo DONE
echo Archive created:
echo %JZIPFILE%
echo =========================

REM Cleanup:
rmdir /S /Q "%TMPDIR%"

endlocal
