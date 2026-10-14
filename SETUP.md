# Tharun Sasanka — Cybersecurity GitHub README + Website

This is a ready-to-upload static website **and** GitHub profile README with local artwork and a smoothly animated hacker illustration.

## Files

```
README.md             GitHub profile README, includes an animated GIF
index.html            Website (GitHub Pages compatible)
styles.css            Dark cyan responsive design and page animations
script.js             Typing terminal, project filters, mobile menu, progress, copy-email
assets/
  cyber-header.png    Original custom cybersecurity banner image
  cyber-concept.png   Full cybersecurity dashboard concept artwork
  hacker-animated.svg Browser-rendered hacker animation
  hacker-typing.gif   Animated GIF for the GitHub README
  hacker-static.svg   Non-animated alternate graphic
  favicon.svg         Shield-themed tab icon
  stats-overview.svg  Local offline fallback for GitHub metrics
  stats-languages.svg Local offline fallback for GitHub languages
```

## Preview locally

Option A: Double-click `index.html` (most of the design works without a web server). Some browser features such as Clipboard APIs may not be available over `file://`.

Option B (recommended): From this folder, run:

```sh
python -m http.server 8080
```

Then open `http://localhost:8080`. Stop the server with Ctrl+C.

## Upload to the right GitHub repository

For a profile README, GitHub requires a public repository with the **exact same name as your username**. For this project:

- GitHub user: `tharunsasanka`
- Repository: `tharunsasanka/tharunsasanka`

Upload the `README.md`, `index.html`, `styles.css`, `script.js`, and entire `assets/` directory **at the repository root**. You can omit `make_art.py`, which is only an optional source-generation script. Commit the changes.

## Enable the website (GitHub Pages)

1. In that repository, open **Settings** → **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose **main** and **/(root)**. Click **Save**.
4. Wait for the deployment to finish in GitHub Actions/Pages status.
5. Visit `https://tharunsasanka.github.io/tharunsasanka/`.

The URL is the default GitHub Pages project-site URL for a repo named `tharunsasanka`, **not** a guarantee that the page is already deployed. If you publish from a different repository, update the website link in README.md to the actual Pages URL.

## Notes

- The GitHub README **cannot run HTML/CSS/JS as a full website**. The included animated GIF and image assets are compatible with GitHub Markdown, while the standalone page uses animated SVG and CSS.
- GIF and SVG motion can be disabled by browser/OS motion preferences where supported. GIFs on GitHub cannot reliably obey prefers-reduced-motion; the SVG source has reduced-motion support for the website.
- All project descriptions refer to project ideas/implementations; please update status and add your verified repository links when ready.
- Images from third-party stats providers depend on their availability. Static local images and the website do not need those services.
- `cyber-concept.png` contains illustrative mock metrics; it is labeled as conceptual art, not actual GitHub data.
- No authentication, admin portal or API is implemented in this static portfolio: project cards describe other work, and this site is a public showcase only.
