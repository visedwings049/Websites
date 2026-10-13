# Marshfield Lennons

Hand-built static site for Marshfield Lennons, a commercial contract
laundering service (rugs, mats, towels, and linens) in Marshfield, MO.

Live at [marshfieldlennons.com](https://marshfieldlennons.com), deployed via
GitHub Pages directly from this repo (`.github/workflows/deploy-marshfield-lennons.yml`
builds and publishes this folder on every push that touches it). The `CNAME`
file here pins the custom domain.

## Deploy

This site deploys automatically via GitHub Actions on push. In the repo's
Settings -> Pages, Source must be set to "GitHub Actions", and Custom domain
set to `marshfieldlennons.com`. DNS for the domain points at GitHub Pages'
standard A records / `visedwings049.github.io` per GitHub's documentation.

## Editing

`index.html`, `style.css`, and `assets/logo.png` are plain static files --
edit them directly. Pricing lives in the table inside the `#pricing` section
of `index.html`; contact info and address are placeholders in the `#contact`
section and footer, marked for the client to replace with real details.
