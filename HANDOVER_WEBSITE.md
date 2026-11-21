# Website content types — Frontend Handover

Content model for the rewrite of the Hugo site `feminizidmap.org`. Every Hugo content page has one single type; the yaml-driven lists (`data/events.yaml`, `data/researchers.yaml`, `data/publications.yaml`) are collection types. Blog is not modelled (yet).

All types use Draft & Publish. Page single types and event/team collections are **localized** (Strapi i18n, locales `de` (default) and `en`). Always pass `?locale=de` or `?locale=en`. Omitting it returns the default locale, which is `de`.

## One-time setup (admin UI)

1. **Settings → Internationalization**: locales `de` (default) and `en` must exist. Both already exist in `strapi.db_13-11.2026` with `de` as the default. The migration creates missing locales but never changes the default.
2. **Settings → Users & Permissions Plugin → Roles → Public**: enable `find` (and `findOne` for collections) for every type below.

## Single types (content pages)

Fields: `title` (string, required, localized), `content` (blocks, localized).

| Hugo file | Endpoint | Fields |
|---|---|---|
| `_index.md` | `GET /api/home` | title, content |
| `about.md` | `GET /api/about?populate[logos][populate]=image` | title, content, logos[] |
| `faq.md` | `GET /api/faq` | title, content |
| `work.md` | `GET /api/work` | title, content |
| `imprint.md` | `GET /api/imprint` | title, content |
| `dataprotection.md` | `GET /api/dataprotection` | title, content |

The Hugo list pages (`events.md`, `contributions.md`, `publications.md`, `researchers.md`) and `offline.md` have no single type. Their front matter only held headings/labels, so the frontend owns those pages and fills them from the collections below.

Intentionally **not** stored (frontend's job):
- `slug` (routing / localized URLs), `navname` (navigation), `layout` (implied by the type).
- `description`: never rendered by Hugo (meta description is hardcoded empty).
- Section headings from front matter: `intro`, `events_past` ("Past events"), `thanks`, `project_related` ("Other contributions"). Treat them as frontend UI strings like the ones in Hugo's `i18n/*.yaml`.

Notes:
- About: the Hugo `{{< partial "logowall.html" >}}` shortcode is replaced by `logos[]` (`name`, `url`, `image`; shared across locales). Render it after the "Awards and funding" section.
- About definitions are blockquotes nested in list items. Strapi blocks can't nest quotes in lists, so each definition becomes its own `quote` block (definition, line break, italic citation).
- Body links still point to old Hugo paths (`/contributions`, `/de/beitraege`, `/events`, `/de/veranstaltungen`, `/press/*.pdf`, `/reports/*.pdf`, `#heading-anchors`). The frontend must resolve or rewrite them.
- Content is migrated by `database/migrations/15112026_migrate_website_content/` (see its README).

## Collection types (yaml data)

### `GET /api/event-items?populate=*&locale=de` ← `data/events.yaml`
| Field | Type | Localized | Hugo key |
|---|---|---|---|
| event_title | string, required | no | `event_title` |
| start_date | date, required (`YYYY-MM-DD`) | no | parsed from `date` ("20. September 2026") |
| end_date | date, optional, multi-day only | no | parsed from `date` ("10.-11. Oktober 2025" → 2025-10-11) |
| start_time | time, optional (`HH:mm:ss.SSS`), null = time unknown | no | – (Hugo has no times) |
| place | string | no | `place` |
| link | string | no | `link` |
| tags | repeatable `website.tag` {label} | no | `tags` |
| sessions | repeatable `website.session` {text} | **yes** | `de.sessions` / `en.sessions` |

`date`/`time` are local values (implied Europe/Berlin), not timestamps, so format them as is; don't convert them through `Date` with a timezone.

Display: with `end_date`, show "start_date – end_date" (dates only). Without it, show `start_date`, plus `start_time` if set.

Past/upcoming is derived, there is no flag (Hugo's `past` is not migrated):
- upcoming: `filters[$or][0][start_date][$gte]=<today>&filters[$or][1][end_date][$gte]=<today>&sort=start_date:asc`
- past: `filters[start_date][$lt]=<today>&filters[$or][0][end_date][$null]=true&filters[$or][1][end_date][$lt]=<today>&sort=start_date:desc`

### `GET /api/team-members?locale=de&sort=name` ← `data/researchers.yaml`
| Field | Type | Localized | Hugo key |
|---|---|---|---|
| name | string, required | no | `name` |
| active | boolean | no | `active` (false = "thanks" list) |
| text | text | **yes** | `text_en` / `text_de` |

### `GET /api/publication-items?populate=*` ← `data/publications.yaml` (not localized)
| Field | Type | Hugo key |
|---|---|---|
| title | text, required | `title` |
| category | enumeration, required, default `miscellaneous`: `feminizidmap_team`, `external_using_our_data`, `miscellaneous` | `project_related` (true → `feminizidmap_team`, false → `miscellaneous`) |
| links | repeatable `website.link` {name, url} | `link` + `link_name` (first entry), then `links` |
| tags | repeatable `website.tag` {label} | `tags` |

The page shows one group per category, in the enum order above. The group headings are frontend translations keyed by the enum value. `external_using_our_data` has no Hugo equivalent; editors assign it in the admin.

### `GET /api/reports?locale=de&populate[report_files][populate]=file&sort=report_year:desc` (localized)
| Field | Type | Localized |
|---|---|---|
| title | string, required | yes |
| release_date | date, required | yes |
| report_year | integer, required (year the data covers) | no |
| report_files | repeatable `website.report-file` {title, file (media, files only)}, e.g. "Report" + "Pressemitteilung" | yes |

`populate=*` does not reach the media inside the component; use the nested populate above.

## Not modelled
`data/network.yaml`, `data/cases.json` (unused by live templates), i18n UI strings (footer, newsletter, labels), navigation config, blog.
