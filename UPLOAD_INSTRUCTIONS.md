# Fixing missing GitHub README images

The pictures were broken because the README references repository files that GitHub cannot find unless they are uploaded together.

1. Open https://github.com/tharunsasanka/tharunsasanka
2. Select **Add file → Upload files** on the repository's **Code** tab.
3. **Extract the ZIP first.** Drag the contents of `tharun-github-fixed` into the GitHub upload page, **including the `assets` directory**. GitHub must keep the filenames in `assets/`, not the ZIP's parent folder. If the web uploader does not preserve folder names, use GitHub Desktop or VS Code to commit/push them.
4. If GitHub rejects README.md because it exists, edit the existing README with the contents of this package, then upload the assets separately.
5. Commit the changes to your repository's default branch and refresh the repository README.

Confirm these paths work after upload:
- https://github.com/tharunsasanka/tharunsasanka/blob/main/assets/cyber-header.png
- https://github.com/tharunsasanka/tharunsasanka/blob/main/assets/hacker-typing.gif

Expected structure (at repository root):
```
README.md
index.html
styles.css
script.js
assets/cyber-header.png
assets/hacker-typing.gif
assets/cyber-concept.png
assets/hacker-animated.svg
assets/stats-overview.svg
assets/stats-languages.svg
```

Note: The profile page uses animated GIF instead of JavaScript; animated SVG/CSS is used on the website. The typing badge and activity graph use external services and could temporarily fail due to service availability.
