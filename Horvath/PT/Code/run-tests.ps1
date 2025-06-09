# Create test results directories
Write-Host "Setting up test results directories..."
$testResultsPath = Join-Path $PSScriptRoot "test-results"
$junitPath = Join-Path $testResultsPath "junit"
$logsPath = Join-Path $PSScriptRoot "logs"

# Remove existing directories
if (Test-Path $testResultsPath) {
    Remove-Item -Path $testResultsPath -Recurse -Force
}
if (Test-Path $logsPath) {
    Remove-Item -Path $logsPath -Recurse -Force
}

# Create new directories
New-Item -Path $testResultsPath -ItemType Directory -Force | Out-Null
New-Item -Path $junitPath -ItemType Directory -Force | Out-Null
New-Item -Path $logsPath -ItemType Directory -Force | Out-Null

# Set environment variables
$env:BROWSER = if ($env:BROWSER) { $env:BROWSER } else { "chrome" }
$env:HEADLESS = if ($env:HEADLESS) { $env:HEADLESS } else { "true" }

Write-Host "Running tests with BROWSER=$env:BROWSER and HEADLESS=$env:HEADLESS"

# Run the tests
npm run test

# List test results
Write-Host "`nTest Results:"
Write-Host "-------------"
if (Test-Path $junitPath) {
    $xmlFiles = Get-ChildItem -Path $junitPath -Filter "*.xml"
    if ($xmlFiles.Count -gt 0) {
        $xmlFiles | ForEach-Object {
            Write-Host "Found test results in: $($_.FullName)"
            # Display basic test results
            $content = Get-Content $_.FullName
            $tests = ($content | Select-String -Pattern 'tests="(\d+)"').Matches.Groups[1].Value
            $failures = ($content | Select-String -Pattern 'failures="(\d+)"').Matches.Groups[1].Value
            $errors = ($content | Select-String -Pattern 'errors="(\d+)"').Matches.Groups[1].Value
            Write-Host "Tests: $tests, Failures: $failures, Errors: $errors"
        }
    } else {
        Write-Host "No test result files found in $junitPath"
    }
} else {
    Write-Host "Test results directory not found: $junitPath"
}