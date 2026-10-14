# Run AFTER: gh auth login (GitHub) and `npx vercel login` (Vercel)
$ErrorActionPreference = "Stop"
Set-Location "$PSScriptRoot\.."

Write-Host "=== GitHub: create repo and push ===" -ForegroundColor Cyan
$repoName = "the-photogenic-experience"
$remote = git remote get-url origin 2>$null
if (-not $remote) {
  gh repo create $repoName --public --source=. --remote=origin --push
} else {
  Write-Host "Remote already set: $remote"
  git push -u origin main
}

Write-Host "`n=== Vercel: production deploy ===" -ForegroundColor Cyan
npx --yes vercel --prod --yes

Write-Host "`nDone. Open your project in the Vercel dashboard for the live URL." -ForegroundColor Green
