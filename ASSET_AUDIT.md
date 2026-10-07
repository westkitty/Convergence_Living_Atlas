# Convergence Living Atlas — Asset Audit

Snapshot: 2026-10-07

## Corrected source of truth

The generated visual corpus is present on the MacBook's mounted Google Drive at:

`/Users/andrew/Library/CloudStorage/GoogleDrive-digitalghosts269@gmail.com/My Drive/macbook/converge`

This path was verified directly on `MacBook-Air.local`. The previous audit statement that the relevant Drive folder was empty was wrong and is superseded by this document.

## Verified corpus

The source tree contains **131 images** across the three project directories below:

- `Oct 07 - 00_03/` — project-specific banners, emblems, icons, timeline/event/relationship/contradiction imagery, Kaz + Duke scenes, Paris scenes, evidence imagery, and other UI art.
- `convergence_character_images/` — generated character and role imagery, including explicit Annie, Azib, and Mister Boots assets.
- `Convergence_Living_Atlas_All_Generated_Images/` — wider cinematic, archive, character-lineup, ruin, and cosmic scene imagery.

## Production curation

The live repository carries a deliberately curated **25-image WebP production pack** under `assets/generated/`, approximately **2.8 MiB total** after optimization. The originals remain untouched in Google Drive.

The production pack drives visible UI surfaces rather than merely existing in the repository:

| Surface | Generated production art |
| --- | --- |
| Global brand mark | `app-icon.webp` |
| Overview hero | `hero.webp` |
| Overview visual archive | Kaz+Duke, Paris, Keys, evidence, factions, archive, cosmic, character network |
| Relationship Atlas canvas | `atlas-bg.webp` |
| Atlas inspector panel | `kaz-duke.webp` |
| Characters | `characters.webp` plus explicit Annie/Azib/Boots/Kaz+Duke imagery |
| Relationships | `relationships.webp` |
| Knowledge | `evidence.webp` |
| Timeline | `timeline.webp` |
| Events | `events.webp` |
| Groups | `groups.webp` |
| Contradictions | `contradictions.webp` |
| Compare | `compare.webp` |
| Field Archive | `archive.webp` |
| Source / methodology | `cosmic.webp` |

Role-based generated images that are not unambiguously named in the source corpus are retained as production assets without falsely assigning them to a specific named character.

## Book-cover family

`assets/covers.webp` remains the compact six-cover sprite used for book provenance, Book Lens navigation, spoiler scope, and book-level chronology. It complements rather than replaces the generated Drive corpus.

## Performance and delivery

- Generated originals were copied read-only from the mounted Google Drive source and converted to WebP at quality 78.
- Production pack size is about 2.8 MiB instead of shipping the entire high-resolution 131-image corpus.
- Hero and Atlas background are preloaded; secondary art uses lazy image loading where appropriate.
- No external image CDN or runtime dependency is introduced.
- Static validation requires every curated production asset to exist, exceed a minimum size, and be referenced by production HTML.
- Browser smoke tests prove the Overview and Atlas render generated-art elements.
- Pages delivery verifies the live public hero and Atlas background bytes against the repository source.
