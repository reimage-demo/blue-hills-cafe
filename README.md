# Blue Hills Cafe

Static website for Blue Hills Cafe in Hartford, Connecticut.

- Website: https://bluehillscafe.com/
- Landing page: https://bluehillscafe.com/landing-page.html

GitHub Pages serves the root of the `main` branch. No build step is needed.

## Local preview

Run `python3 -m http.server 8077` from this directory.

## Connections

- Rental buttons currently link to `host.html#appispot`, which offers a rental inquiry. Replace these links with the confirmed Appispot listing when the business is connected.
- Catering inquiries open an email draft. There is no server-side form submission.
- Official social account URLs are pending. Add verified links in the landing page's social section when available.

## What’s on

- Keep the recurring $5 Thursday banner above the dated event list in `events.html`.
- Add dated events in chronological order with `data-event-date="YYYY-MM-DD"`. The page also sorts them by this date on load.
- Set `data-paid-promotion="true"` on an event only after its promotion payment is confirmed. All current events are unconfirmed and set to `false`.
- On page load, past events are hidden and the first remaining event (including today's event) automatically gets a brief, centered pop-up: title, date, `data-promo-summary` (venue and admission details), and a details link. Dates use the cafe’s America/New_York time zone. Only paid promotions say “Sponsored event.” No event pop-up appears when all dates have passed.
- The Thursday offer opens automatically on the homepage. Each automatic pop-up appears once per tab session; direct links to page sections skip it. The announcement can reopen the Thursday offer on any page.

## Search and AI discovery

- `sitemap.xml` lists all eight public pages using their canonical `https://bluehillscafe.com` URLs. When adding or removing pages, update the sitemap and each page's canonical link. The Google ownership verification file is intentionally excluded. Optional `lastmod` values are omitted to avoid inaccurate modification dates.
- `robots.txt` allows crawling and advertises the sitemap. It does not enforce access control.
- Every public page has its own title, description, canonical URL, sharing metadata, and a discovery link to `llms.txt`.
- `index.html` contains static JSON-LD for the website and local bar business. Keep its address, phone, and opening hours in sync with visible page content. Overnight hours close on the following day. Add only confirmed business details.
- `llms.txt` provides a concise business summary and links for tools that support this proposed format. Keep it synchronized when services or contact details change; dated event announcements belong on `events.html`. It does not guarantee AI citations or search rankings, and Google does not require it for AI search features.

After publishing these files through the normal GitHub Pages deployment, submit `https://bluehillscafe.com/sitemap.xml` in the verified Google Search Console property. Use URL Inspection on the homepage, events page, and hosting page, and check the homepage in Google's Rich Results Test. Keep the cafe's Google Business Profile address, phone, and hours consistent with the site.

References: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features), and [the llms.txt proposal](https://llmstxt.org/).

## Bing IndexNow

Canonical URLs and `sitemap.xml` use https://bluehillscafe.com/. Keep `indexnow-key.txt` at the published site root; it verifies URL submissions to Bing IndexNow. Submission confirms receipt, not inclusion in search results.
