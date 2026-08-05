param(
    [string]$Message
)

Clear-Host

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "      PANOS DEVELOPMENT TOOL" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

#--------------------------------------------------
# Push to GitHub
#--------------------------------------------------

& .\push.ps1 $Message

if ($LASTEXITCODE -ne 0) {

    Write-Host ""
    Write-Host "Push failed." -ForegroundColor Red
    exit

}

Write-Host ""
Write-Host "Waiting 5 seconds for GitHub Pages..."
Start-Sleep -Seconds 5

#--------------------------------------------------
# Open browser
#--------------------------------------------------

& .\test.ps1

Write-Host ""
Write-Host "Ready to test on your phone." -ForegroundColor Green
Write-Host ""