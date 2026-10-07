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


## `/macbook/converge/converg` expansion

A newer nested Google Drive corpus was verified at:

`/Users/andrew/Library/CloudStorage/GoogleDrive-digitalghosts269@gmail.com/My Drive/macbook/converge/converg`

The folder contains **331 image files** totaling approximately **301 MB**. The source files are predominantly **1376×768** cel-shaded / flat-animation illustrations and include multiple variants for the same narrative subject.

### Curated production integration

The application now ships an additional **43-image WebP subset** under `assets/generated/converg/`, approximately **4.8 MiB** after optimization. Selection was semantic rather than exhaustive: one strong, visually reviewed image was chosen for each encoded record class that the new corpus could directly support.

Coverage is now:

- **13 / 13 encoded events** — individual situation art.
- **7 / 7 constellation groups** — individual group art and inspector art.
- **9 / 9 locations** — individual archive thumbnails and deep-linked inspector art.
- **8 / 8 currently encoded artifacts** — individual archive thumbnails and deep-linked inspector art.
- **6 / 6 recurring themes** — individual archive thumbnails and deep-linked inspector art.

The remaining duplicate variants stay in Drive rather than bloating the public site.

### Canon guard

The new folder contains generated concepts for many additional named figurine/key shapes. Those filenames are **not treated as canon facts**. The Atlas only promotes the artifact identities already encoded from the novels. In particular, generated labels beyond the established gnome, gryphon, dragon, aggregate mooring-key set, amulet, notebook, map, and astrolabe remain unused as factual entries unless source evidence establishes them.

### Delivery contract

The new record assets are not decorative repository cargo:

- event cards, timeline cards, Book Lens event cards, and event inspectors load event-specific images;
- group cards and group inspectors load group-specific images;
- archive location/artifact/theme rows now have thumbnails and keyboard-accessible deep links;
- location, artifact, and theme records now open first-class inspectors with their visual asset;
- global search routes groups, locations, artifacts, and themes directly to those records;
- validation requires all 43 production assets;
- browser smoke verifies events, groups, timeline, and archive integration;
- Pages verification compares live public bytes for both an event image and a location image.
