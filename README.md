# Built in Precision — ACCP Construction

Proposal 04, revision 02: corporate blue, burgundy, limestone and ivory. A cinematic Florida construction timelapse opens the website, followed by the architecture collection, brand system and three physical brand applications.

[View the proposal](https://eugenioleal117.github.io/ACCP-Proposal-4-Built-in-Precision/)

## Experience

- A HeyGen-generated photorealistic construction film in the hero: vacant lot to completed Florida home. Muted inline playback with pause, replay and seeking.
- Warm mineral surfaces and a burgundy editorial band provide visible contrast to the blue identity.
- Rebuilt Silverado, stationery and polo mockups: logos are integrated into the photographs; there are no positioned CSS logo overlays.
- The six approved construction icons are retained. The five social icons use clean, familiar monochrome Simple Icons silhouettes.
- Architectural study gallery, category filters, original logo editions, copyable palette, typography, mobile navigation and persistent light/dark theme.
- A two-step local inquiry demonstration with browser validation and no data transmission or contact persistence.

## Local preview

Run `python3 scripts/serve.py` and open `http://127.0.0.1:8784/`. The server supports byte ranges for video seeking in Safari. GitHub Pages serves `/` on `main`. No build, account or backend is needed to view the site. Fonts and media are served from the repository.

`node --check app.js` checks the interaction script.

## Media and rights

Architecture, construction footage and brand applications are illustrative AI-generated studies, not documentation of actual ACCP jobs. The timelapse is generated with HeyGen Video 1; it is not live-action footage captured on a client's site. Mockup images are generated with the original ACCP logo as their reference. They are presentation concepts, not production-ready vehicle-wrap or embroidery artwork.

The opening film has a poster for loading, reduced motion and media-error fallback. Normal motion-enabled playback starts automatically while the hero is visible and pauses when hidden or offscreen. A user pause takes priority over autoplay. The old illustrated construction film and its SVG/HyperFrames sources have been removed from the deployable tree.

ACCP artwork remains the owner's property. Inter and Barlow Condensed use their bundled SIL OFL licenses. Social glyphs are from Simple Icons 16.38.0 under CC0; the license is included in `assets/SimpleIcons-LICENSE.md`. Use of platform marks remains subject to the relevant platform's brand rules.

See `DESIGN.md`, `ASSET-PROMPTS.md` and `VERIFICATION.md` for the direction, media provenance and observed checks.
