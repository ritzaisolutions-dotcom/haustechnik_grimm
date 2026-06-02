# Regenerates WebP siblings for JPG/PNG in website/images (requires ffmpeg on PATH).
$imageDir = Join-Path $PSScriptRoot '..\website\images'
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpeg) {
  Write-Error 'ffmpeg not found. Install via winget: winget install Gyan.FFmpeg'
  exit 1
}

Get-ChildItem $imageDir -File | Where-Object {
  $_.Extension -match '^\.(jpe?g|png)$' -and $_.Name -notmatch 'favicon'
} | ForEach-Object {
  $out = [System.IO.Path]::ChangeExtension($_.FullName, '.webp')
  & ffmpeg -y -hide_banner -loglevel error -i $_.FullName -c:v libwebp -quality 82 $out
  Write-Host "OK $($_.Name) -> $([math]::Round((Get-Item $out).Length / 1KB)) KB"
}
