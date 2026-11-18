# Built in Precision — ACCP Construction

Proposal 04 / revision 05 extends **Fachada abierta** with four additional photographic applications. The cleaned user-sketch variant of the ACCP house lettermark retains open diagonal cuts under both C roof arms.

[View the proposal](https://eugenioleal117.github.io/ACCP-Proposal-4-Built-in-Precision/)

## Experience

- Silent 20-second HeyGen construction film, native autoplay and loop, with no pause/replay/progress UI. The app does not pause it during scrolling or dialogs. It retries playback on readiness, page return and first interaction if browser autoplay policy blocks it.
- Fachada abierta header/footer and statement mark, six color editions, stacked/horizontal/lettermark signatures, avatars, optical small-size cut, favicon, downloadable SVGs, identity guide and a curated brand kit, all rebuilt from the new vector master.
- Corporate blue, Burgundy, Limestone and Ivory. No orange brand color.
- Four architectural gallery photographs from revision 03: Florida residence, commercial headquarters, steel/glass connection and sheltered courtyard. Material-library photography replaces the empty word strip.
- Seven photographic mockups: the approved white Silverado, navy polo and navy/ivory stationery are retained; an ivory polo, black Silverado, light-blue dress shirt and Midnight dress shirt extend the collection. Every application uses the current open-C logo. The earlier illustrated application folder is excluded.
- Six approved construction icons and five clean social silhouettes retained, with study filters, gallery dialog, persistent light/dark theme and mobile navigation.
- A local two-step inquiry prototype. No information is sent or retained by a backend.

## Local preview

Run `python3 scripts/serve.py 8786` and open `http://127.0.0.1:8786/`. The server supports byte ranges for video. GitHub Pages publishes `/` on `main`; no build step is needed.

Run `node --check app.js` for script syntax. See `VERIFICATION.md` for observed checks and limits.

## Assets and rights

Photos, footage and mockups are illustrative AI-generated studies, not documentation of ACCP jobs. The video is generated with HeyGen Video 1. This revision adds four built-in ImageGen assets, with exact prompts recorded in `ASSET-PROMPTS.md` alongside prior image provenance. Mockup logos are part of the generated image, without floating CSS overlays.

Logo artwork is custom geometric SVG. All logo signatures are outlined; website text uses the bundled Inter and Barlow Condensed fonts and licenses. Social marks use Simple Icons under its included license. See `assets/identity-v2/GUIA-DE-USO.md` for reproduction guidance. CMYK values are unprofiled references; confirm physical color and materials with suppliers.

Native autoplay is subject to browser and operating-system policy. CSS/interface motion still respects reduced-motion preferences; the explicit requested continuous film remains an autoplay loop.
