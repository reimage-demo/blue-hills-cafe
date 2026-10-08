# Blue Hills Cafe

Static website for Blue Hills Cafe in Hartford, Connecticut.

- Website: https://reimage-demo.github.io/blue-hills-cafe/
- Landing page: https://reimage-demo.github.io/blue-hills-cafe/landing-page.html

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
- The next upcoming paid event gets a brief pop-up: date, title, `data-promo-summary` (venue and price), and a details link. It appears once per tab session; direct links to page sections skip it. Past events do not get pop-ups.
- The Thursday offer opens manually from the announcement on other pages; it no longer opens automatically.
