# WorldLens — Interactive Global News Globe

A portfolio project demonstrating a production-style global news explorer using only HTML5, CSS3 and Vanilla JavaScript with Three.js/Globe.gl from CDNs.

## Run

Open `index.html` through a simple local server because browsers restrict local `fetch()` requests.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/world-news-globe/`.

## Included

- Interactive 3D Earth
- Auto rotation with pause/resume
- Country markers and geographic boundaries
- Search for countries, regions and cities
- WORLD → COUNTRY → REGION → CITY navigation
- Breadcrumb and back navigation
- Demo news with photos and original-article links
- News category filters
- Heatmap-style marker mode
- Responsive desktop/mobile layout
- Fallback images and error handling

## Demo path

WORLD → INDIA → WEST BENGAL → KOLKATA → NEWS

The data files are intentionally separated so more countries, regions, cities and stories can be added without rewriting the UI.

## Live news

`config.js` contains a placeholder API configuration. A production deployment should normally use a backend proxy so private API credentials are not exposed in frontend JavaScript.

## Deployment

The folder can be deployed to Vercel, Netlify, GitHub Pages or Cloudflare Pages as a static website.

## Automatic live news

WorldLens now uses a **free Google News RSS pipeline** with no API key:
- GitHub Actions refreshes the news every 6 hours.
- A manual workflow-dispatch run is available from GitHub Actions.
- Fresh stories are saved to `news.json` with title, description, source, published time, article link and thumbnail when the RSS feed provides one.
- The browser adds a cache-busting timestamp so visitors receive the newest generated feed instead of an old browser/CDN cache.
- If a temporary RSS failure occurs, the previous working news file is preserved.
- `news-updater.py` maps location-specific feeds to the existing World → Country → Region → City globe navigation.

No paid news API key is required.
