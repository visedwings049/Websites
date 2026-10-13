# Marshfield Lennons

Hand-built static site for Marshfield Lennons, a commercial contract
laundering service (rugs, mats, towels, and linens) in Marshfield, MO.

Currently live at [marshfieldlennons.com](https://marshfieldlennons.com),
deployed via GitHub Pages from the `visedwings049/poddedprofits-rss` repo.
This copy lives here for source organization alongside the other
contractweb sites.

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial site for Marshfield Lennons"
git branch -M main
git remote add origin <your-new-github-repo-url>
git push -u origin main
```

Then in the repo's Settings -> Pages, deploy from the `main` branch (root),
and add the client's custom domain under Settings -> Pages -> Custom domain.
Point the domain's DNS (A/ALIAS or CNAME records) at GitHub Pages per
GitHub's documentation, then wait for DNS to propagate and HTTPS to provision.

## Editing

`index.html`, `style.css`, and `assets/logo.png` are plain static files --
edit them directly. Pricing lives in the table inside the `#pricing` section
of `index.html`; contact info and address are placeholders in the `#contact`
section and footer, marked for the client to replace with real details.
