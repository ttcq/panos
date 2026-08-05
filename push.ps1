param(
    [string]$Message
)

Clear-Host

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "         PANOS DEPLOY TOOL" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

git status

$changes = git status --porcelain

if (-not $changes) {

    Write-Host ""
    Write-Host "Nothing to commit." -ForegroundColor Yellow
    exit

}

if ([string]::IsNullOrWhiteSpace($Message)) {

    $Message = Read-Host "Commit message"

}

Write-Host ""
Write-Host "Adding files..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "Committing..." -ForegroundColor Yellow
git commit -m $Message

if ($LASTEXITCODE -ne 0) {

    Write-Host ""
    Write-Host "Commit failed." -ForegroundColor Red
    exit

}

Write-Host ""
Write-Host "Pushing..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -ne 0) {

    Write-Host ""
    Write-Host "Push failed." -ForegroundColor Red
    exit

}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "GitHub Pages:"
Write-Host "https://ttcq.github.io/panos/?v=$([DateTime]::Now.Ticks)" -ForegroundColor Cyan
Write-Host ""