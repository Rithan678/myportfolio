@echo off
echo Drag and drop your profile image onto this file to add it to your portfolio
echo.
if "%~1"=="" (
    echo No file was dropped. Please drag and drop your image file onto this batch file.
    pause
    exit /b
)

set "source=%~1"
set "destination=public\images\rithan-profile.jpg"

echo Source: %source%
echo Destination: %destination%
echo.

if not exist "public\images" mkdir "public\images"

copy "%source%" "%destination%"

if %errorlevel% == 0 (
    echo.
    echo ✓ Profile image added successfully!
    echo Your image is now available at: %destination%
    echo Refresh your browser to see the updated portfolio.
) else (
    echo.
    echo ❌ Failed to copy image. Please check the file path.
)

echo.
pause