@echo off
setlocal enabledelayedexpansion

REM Create timestamp (YYYYMMDD-HHMMSS)
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd-HHmmss"') do set TS=%%i

REM Target output directory
set OUTDIR=%CD%\..\packaged
if not exist "%OUTDIR%" mkdir "%OUTDIR%"

REM Create temp directory
set TMPDIR=%TEMP%\experiment_%RANDOM%
mkdir "%TMPDIR%"

echo Temp directory: %TMPDIR%

REM Create folder structure
mkdir "%TMPDIR%\ffk"
mkdir "%TMPDIR%\ffk\stimuli"
mkdir "%TMPDIR%\ffk\core"
mkdir "%TMPDIR%\ffk\css"

REM Copy main file
copy "..\misc\ffk.jas" "%TMPDIR%\" >nul

REM Copy required files into ffk
copy "..\start-experiment.html" "%TMPDIR%\ffk\" >nul
copy "..\config.js" "%TMPDIR%\ffk\" >nul

REM Optional files
if exist "..\consent.pdf" copy "..\consent.pdf" "%TMPDIR%\ffk\" >nul
if exist "..\instructions.pdf" copy "..\instructions.pdf" "%TMPDIR%\ffk\" >nul

REM Copy folders
xcopy "..\stimuli\*" "%TMPDIR%\ffk\stimuli\" /E /I /Y >nul
xcopy "..\core\*" "%TMPDIR%\ffk\core\" /E /I /Y >nul
xcopy "..\css\*" "%TMPDIR%\ffk\css\" /E /I /Y >nul

REM Create archive in packaged folder
set ZIPNAME=ffk-%TS%.jzip
powershell -NoProfile -Command "Compress-Archive -Path '%TMPDIR%\*' -DestinationPath '%OUTDIR%\%ZIPNAME%'"

echo Done!
echo Archive created: %OUTDIR%\%ZIPNAME%

REM Cleanup
rmdir /S /Q "%TMPDIR%"

endlocal
