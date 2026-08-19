# Validate every manifest download URL returns HTTP 200 before publishing.
param(
    [string]$ManifestPath = "",
    [switch]$All
)

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot

function Test-ManifestFile {
    param([string]$Path)
    $manifest = Get-Content $Path -Raw | ConvertFrom-Json
    $base = $manifest.updateBaseUrl.TrimEnd("/") + "/"
    Write-Host ""
    Write-Host "=== $($manifest.id) v$($manifest.version) ===" -ForegroundColor Cyan
    $failed = 0
    foreach ($entry in $manifest.files) {
        $url = $base + ($entry.file -replace '\\', '/').TrimStart('/')
        try {
            $resp = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing
            Write-Host ("  OK {0}  {1}" -f $resp.StatusCode, $entry.file) -ForegroundColor Green
        }
        catch {
            Write-Host ("  FAIL {0}" -f $url) -ForegroundColor Red
            $failed++
        }
    }
    if ($failed -gt 0) {
        throw "$failed URL(s) failed for $Path"
    }
    Write-Host "  All $($manifest.files.Count) URLs OK." -ForegroundColor Green
}

if ($All) {
    Get-ChildItem (Join-Path $repo "update") -Recurse -Filter "manifest.json" | ForEach-Object {
        Test-ManifestFile $_.FullName
    }
}
elseif ($ManifestPath) {
    Test-ManifestFile (Resolve-Path $ManifestPath)
}
else {
    Test-ManifestFile (Join-Path $repo "update\crimson-desert\manifest.json")
}

Write-Host ""
Write-Host "Validation passed." -ForegroundColor Green
