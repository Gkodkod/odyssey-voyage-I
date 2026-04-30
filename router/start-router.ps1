# start-router.ps1  

$env:APOLLO_KEY = "service:flyby-396qpg:wBJlf5_X6FItwRsVTOooSQ"
$env:APOLLO_GRAPH_REF = "flyby-396qpg@current"

Write-Host "Starting Apollo Router with managed federation..." -ForegroundColor Green

.\router --config .\config.yaml