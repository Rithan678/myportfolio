# Add Profile Image Script
# Instructions: 
# 1. Save your profile image as any common format (jpg, png, etc.)
# 2. Run this script in PowerShell from the project root
# 3. When prompted, enter the full path to your image file

param(
    [Parameter(Mandatory=$false)]
    [string]$ImagePath
)

if (-not $ImagePath) {
    Write-Host "Please drag and drop your image file here, then press Enter:"
    $ImagePath = Read-Host
    $ImagePath = $ImagePath.Trim('"')
}

if (Test-Path $ImagePath) {
    $destinationPath = "public\images\rithan-profile.jpg"
    
    # Create directory if it doesn't exist
    $dir = Split-Path $destinationPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -Path $dir -ItemType Directory -Force
    }
    
    # Copy and rename the image
    Copy-Item $ImagePath $destinationPath -Force
    Write-Host "Profile image added successfully!" -ForegroundColor Green
    Write-Host "Your image is now available at: $destinationPath" -ForegroundColor Cyan
    Write-Host "Refresh your browser to see the updated portfolio." -ForegroundColor Yellow
} else {
    Write-Host "Image file not found: $ImagePath" -ForegroundColor Red
    Write-Host "Please check the file path and try again." -ForegroundColor Yellow
}