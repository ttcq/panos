Clear-Host

$url = "https://ttcq.github.io/panos/?v=$([DateTime]::Now.Ticks)"

Write-Host ""
Write-Host "Opening:"
Write-Host $url -ForegroundColor Cyan
Write-Host ""

Start-Process $url