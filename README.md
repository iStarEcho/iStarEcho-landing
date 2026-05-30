# iStarEcho

Coming soon landing page for **iStarEcho** — a framework for AI-human interactive relationships.

> "AI is not a program serving a thousand people —
>  it is a presence accompanying one."

Summer 2026.

---

## Local Preview

```bash
python3 -m http.server 8000 --bind 127.0.0.1
# open http://127.0.0.1:8000
```

## Production Build

Source files keep developer comments for team collaboration. The build
pipeline strips all comments before deploying to the public CDN, so
internal notes never reach the live site.

```bash
npm install     # one-time
npm run build   # output: ./dist/
```

The `dist/` directory contains the clean public artifact (HTML / CSS /
JS without comments). Cloudflare Pages should be configured with:

- Build command: `npm run build`
- Build output directory: `dist`

## Structure

```
istarecho-landing/
├── index.html        Main page
├── philosophy.html   Subpage (philosophy / 5-layer memory)
├── proof.html        Subpage (evidence / "she really remembers")
├── business.html     Subpage (for working professionals)
├── style.css         Styles (night sky theme)
├── i18n.js           4 languages (en / zh-TW / zh-CN / ja)
├── _headers          Cloudflare Pages security headers
├── build.js          Production build (strips comments)
├── package.json      Build dependencies
└── README.md         This file
```

## Design Principles

- **Quiet and spacious** — restrained elements, no clutter
- **Gentle animation** — fade-in only, no parallax / cursor effects
- **No tracking** — no GA / GTM / analytics, no cookie banner needed
- **Reversible** — pure static, easy to take down

## Contact

`hello@istarecho.ai`

## License

TBD
