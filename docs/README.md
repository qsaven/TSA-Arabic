# Publish website to GitHub Pages

Static landing page for the Kingsroad Arabic mod.

## Files

- `index.html` — main page (Arabic + English game name, install guide, FAQ)
- `style.css` — TSA theme
- `site.json` — version, download link, changelog (edit or sync)
- `site.js` — loads metadata into the page

## Sync version from build

```powershell
powershell -File scripts\sync-website.ps1
```

## Publish to GitHub Pages

Uses repo: `qsaven/kingsroad-arabic-updates` → folder `docs/`

```powershell
powershell -File scripts\publish-website.ps1
```

Then on GitHub: **Settings → Pages → Source: Deploy from branch `main` / folder `/docs`**

Site URL: https://qsaven.github.io/kingsroad-arabic-updates/

## Download link

Upload `TSA-Kingsroad-Arabic.zip` to **GitHub Releases** on the updates repo, then set `downloadUrl` in `site.json`:

```
https://github.com/qsaven/kingsroad-arabic-updates/releases/latest/download/TSA-Kingsroad-Arabic.zip
```

## Local preview

Open `website/index.html` in a browser, or:

```powershell
python -m http.server 8080 --directory website
```

Then visit http://localhost:8080
