# Verification — Proposal 04

Observed on November 18, 2026.

## Website

- `node --check app.js` passes.
- Local asset paths and internal anchors resolve. Original ACCP artwork, four logo editions, six construction icons and five social specimens are present.
- Browser inspection at 320, 390 and 1440 CSS pixels: document width equals viewport width; no horizontal overflow observed.
- Mobile navigation: opening focuses Architecture; Escape closes and returns focus to the menu button; a section link closes the menu.
- Dark/light theme persists after reload.
- Gallery filter shows the matching study count; dialog navigation updates the study title and status with ArrowRight.
- Inquiry: a two-digit ZIP prevents advancement; valid ZIP + Enter advances to contact; valid demo name/email + Enter shows local completion. Closing clears all input fields. No transmission or contact persistence is implemented.
- Video metadata: H.264 High, yuv420p, 1600×900, 30 fps, exactly 18 s, 1,934,354 bytes. Browser loads it and phase selection seeks to 16 s; the final rendered house is visible. Playback is muted and inline.
- Local Safari seeking requires byte-range HTTP responses. `scripts/serve.py` provides them; plain Python SimpleHTTPServer does not.

## HyperFrames

`hyperframes@0.9.67 check motion --at 0.8,3,5.5,9.5,13,16`:

| Pass | Errors | Warnings |
|---|---:|---:|
| Static lint | 0 | 0 |
| Runtime | 0 | 0 |
| Layout | 0 | 0 |
| Motion | 0 | 0 |
| Contrast | 0 | 0 |
| Craft | 0 | 1 |

The remaining craft warning is `film_silent`: accepted for a silent website process animation. Reading text was raised to the checker’s floor. The decorative site grid intentionally bleeds beyond the canvas and is marked as decorative/intentional overflow.

Snapshots at 0.8, 3.5, 6, 10.5, 16 and 17.75 seconds were visually reviewed. They show accumulation from site to completed house with no empty inter-scene cuts. Rendering used one worker and the low-memory profile. The output MP4’s final frame was decoded and visually checked.

## Limits

Responsive checks use browser viewport emulation, not a physical phone. VoiceOver/NVDA speech and Windows forced colors were not verified. Reduced-motion behavior is implemented in CSS and playback logic; no physical accessibility-device test is claimed. Illustrative mockups indicate a design direction, not production-ready print or embroidery files.
