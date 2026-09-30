# Steto public landing

Scope: the public `/` route only. Keep authenticated routes and Clerk behavior unchanged.

Direction: the owner's light-only preference, supplied Steto wordmark, and DaisyUI components. Calm medical-document language with confident editorial type, not a generic software feature grid.

Design read: public introduction for Indonesian puskesmas staff; warm paper, charcoal type, amber document accents. ENERGY 2 / RHYTHM 3 / MOTION 1.

## Decisions

- White and warm paper backgrounds keep clinical text legible; amber comes from the supplied document logo and marks the main action and example sheet.
- Retain Geist for its readable forms at both interface and headline sizes and to avoid another font download; monospace is limited to document section identifiers.
- A left-aligned headline and an interactive document example explain the product before workflow details.
- The sheet-offset motif repeats the overlapping paper in the real logo; it is not a browser-window costume or a fabricated screenshot.
- Only the example document receives a soft shadow to separate the front sheet from its amber backing.
- The example badge explicitly identifies illustrative content. No AI execution, patient record, or connected SATUSEHAT status is implied.
- Four workflow entries represent patient preparation, consent, draft review, and code review; these describe the intended flow rather than claim all routes are implemented.
- Generous hero spacing gives way to denser editorial workflow rows and a short closing action. No repeated feature-card grid.
- Buttons use DaisyUI; keyboard-accessible tabs switch bundled example content without API calls, loading delays, or recording permission.
- Scope DaisyUI with a `du-` class prefix and root tokens inside `.steto-landing`, keeping legacy authenticated styles separate.
- Use the complete owner-provided logo at its native aspect ratio, with no extra wordmark beside it.
- Motion is limited to hover/focus feedback. No autoplay, scroll reveal, pulse, or decorative emoji.

## Content boundaries

The live app currently has authentication and a patient list. The public page describes Steto's documentation purpose and labels the consultation illustration `Contoh`. Do not advertise live AI processing, completed FHIR validation, SATUSEHAT delivery, measured speed, active customers, or certifications. Do not copy premium DaisyUI templates or claim Blueprint MCP was used.

## Asset

Source: `/home/fuudaya/Downloads/Group 4963.png`, supplied by the owner.
Public derivative: `apps/web/public/steto-wordmark.webp`, lossless WebP at 528 × 204, preserving the full image. Display width 116px, height auto. No crop, recolor, or added text.
