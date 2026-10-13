# Websites

A template-based system for building simple business websites, plus the
finished sites themselves. No build tools or frameworks required — just
static HTML/CSS/JS, either generated from a reusable template and a
per-business config file, or built by hand.

## Structure

```
templates/<template-name>/   Master template (HTML/CSS/JS with {{placeholders}})
scripts/generate-site.js     Generator: fills a template with a config to produce a site
sites/<slug>/                Generated, ready-to-deploy sites (output, git-ignored except a keep file)
<site-name>/                 Each finished client site lives in its own top-level folder
                              (e.g. all-hearts-aflame/, marshfield-lennons/), checked in —
                              whether generated from a template or built by hand
```

## Creating a new business site

1. Copy the example config:
   ```
   cp templates/business/config.example.json my-business.json
   ```
2. Edit `my-business.json` with the business's name, contact info, colors,
   services, and testimonials.
3. Generate the site:
   ```
   node scripts/generate-site.js my-business.json
   ```
4. The finished site is written to `sites/<slug>/`. Open
   `sites/<slug>/index.html` in a browser to preview it, or deploy that
   folder as-is to any static host (Netlify, GitHub Pages, S3, etc.).

## Adding a new template

Create a new folder under `templates/`, e.g. `templates/restaurant/`, with
the same structure as `templates/business/` (an `index.html`, `css/`, `js/`,
and a `config.example.json` describing the fields it expects). Then generate
with:

```
node scripts/generate-site.js my-config.json restaurant
```

## Placeholder syntax

Templates use `{{fieldName}}` placeholders that are replaced with values
from the config JSON (dotted paths like `{{socialLinks.facebook}}` are
supported). The `business` template also supports `services` and
`testimonials` arrays, which are rendered as repeated cards.
