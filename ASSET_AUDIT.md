# Convergence Living Atlas — Asset Audit

Snapshot: 2026-10-07

## Source surfaces inspected

- GitHub repository `westkitty/Convergence_Living_Atlas`
- Connected Drive folder `Convergence Living Atlas`
- Parent project Drive surface and targeted searches for Convergence / Craig Alanson / book-title imagery
- Six supplied book-cover images extracted from the provided book materials

The dedicated Drive folder is currently empty. Broad Drive search produced unrelated images from other projects; those were deliberately **not** imported. The six supplied covers are therefore the confirmed visual asset family governing this pass.

## Confirmed cover family

| Book | Source dimensions | Source weight | Derived palette | Current role |
| --- | ---: | ---: | --- | --- |
| Convergence | 696×900 | 78,869 B | #261947 · #422852 · #7e5064 | hero, book lens, scope picker, character provenance, timeline/event texture |
| Dragonslayer | 696×900 | 101,077 B | #251e45 · #6f82ab · #363a64 | book lens, scope picker, progression, timeline/event texture |
| First Strike | 696×900 | 70,478 B | #161d3d · #183068 · #4b6fae | book lens, scope picker, progression, timeline/event texture |
| Recon | 696×900 | 101,954 B | #482607 · #683205 · #7b490d | book lens, scope picker, progression, timeline/event texture |
| Desperate Measures | 696×900 | 103,866 B | #67633d · #7f7d51 · #49381b | book lens, scope picker, progression, timeline/event texture |
| Dead World | 696×900 | 84,492 B | #606675 · #505364 | book lens, scope picker, progression, timeline/event texture |

## Runtime asset

`assets/covers.webp` is a 900×194, 20,986-byte WebP sprite containing all six supplied covers. The site intentionally uses one cached request instead of loading six separate full-resolution images.

## Asset opportunity matrix

| Asset use | Before | After |
| --- | --- | --- |
| Hero identity | cover fan only | cover fan + intro cover strip |
| Book navigation | decorative tiles | first-class Book Lens routes |
| Spoiler scope | text-only selector | visual cover selector with asset mood |
| Character index | no source-art cue | first-book cover watermark |
| Character dossier | sigil only | source-book cover + sigil |
| Timeline | plain cards | per-book cover texture |
| Event index | plain cards | per-book cover texture |
| Knowledge | plain proposition cards | source-book cover texture |
| Contradictions | generic cards | source-book cover texture |
| Inspectors | text-only | cover provenance thumbnail |
| Methodology | text-only corpus list | clickable cover thumbnails |

## Performance decision

The cover sprite remains the production visual source because it gives the asset-led experience at roughly 21 KB total transfer and avoids six additional image requests. No external image CDN or runtime dependency was introduced.
