# Verification — Proposal 04, revision 02

Observed November 18, 2026.

## New media and design

- HeyGen Video 1 generation `618c0acee4c54554a7e946f35d55131e` completed. A ten-frame contact sheet was visually reviewed: excavation, slab, concrete-block walls, roof trusses, enclosure and a completed Florida house appear in sequence. The output has a photographic visual treatment. It remains AI-generated illustrative footage.
- Website MP4: H.264, yuv420p, 1120 × 640, 24 fps, exactly 20 seconds, 6,569,813 bytes, no audio track, fast-start metadata. The loading poster comes from the finished-house portion of the same film.
- All three new 1536 × 1024 mockups were inspected. The navy fleet logo is visibly larger on the white Silverado doors. Cards and polo have their marks integrated into the generated imagery. Browser display preserves their aspect ratios without positioned logo overlays.
- Warm limestone/ivory sections and a burgundy statement band contrast with corporate blue. There is no orange brand token.
- Six construction SVG symbols are byte-for-byte unchanged from the approved previous revision. Five social glyphs now use Simple Icons platform silhouettes.
- The old illustrated MP4, SVG house, GSAP copy and HyperFrames composition are removed from the deployable tree.

## Source and browser checks

- `node --check app.js` passes. HTML assets and fragment targets resolve; no duplicate IDs. CSS asset references resolve (the embedded data-URI select arrow is self-contained).
- Local browser inspection at 320, 390 and 1280 CSS pixels: document width equals viewport width. Mobile mockup images load at their full natural ratio. The mobile opening video shows the landscape frame above the headline instead of cropping the house to portrait.
- Opening film loads with duration 20 seconds and readyState 4. Automatic playback observed, pause stops playback, keyboard seeking reaches 20 seconds, and Replay starts again at zero. Film pauses when scrolled offscreen.
- Mobile menu opens, focuses Architecture, then closes when Applications is activated.
- No broken non-dialog images or browser console errors observed after the final local media export.
- Existing gallery and inquiry behavior remains implemented; this revision changes neither submission nor storage behavior. Inquiry remains a local demonstration, not a live lead delivery system.

## Limits

Responsive checks use viewport emulation, not a physical phone. Reduced motion is handled in CSS and video autoplay logic; operating-system accessibility emulation and screen-reader speech were not exercised in this revision. Mockups are presentation concepts, not production-ready wrap, print or embroidery artwork. Requested generation resolution was 1080p; the provider returned 1344 × 768, with a 1120 × 640 optimized website export; the original is retained locally.
