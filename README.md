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
- Set `data-popup="true"` to feature a cafe event without implying a paid sponsorship. The next upcoming featured or paid event gets a brief, centered pop-up on the events page: title, date, `data-promo-summary` (venue and price), and a details link. Only paid promotions say “Sponsored event.” Past events do not get pop-ups.
- The Thursday offer opens automatically on the homepage. Each automatic pop-up appears once per tab session; direct links to page sections skip it. The announcement can reopen the Thursday offer on any page.
