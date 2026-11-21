# Hugo site → Strapi website content (15.11.2026)

Moves the **textual** content of the old Hugo site (`feminizidmap.org` repo) into
the website content types (see `HANDOVER_WEBSITE.md`). Assets (images, PDFs) are
not migrated.

## Run

```bash
nvm use 22   # better-sqlite3 is built for Node 22
S=database/migrations/15112026_migrate_website_content/migrate_website_content.js
node $S --db database/<file>                     # dry run: parse + run log, DB untouched
node $S --db database/<file> --apply             # write
node $S --db database/<file> --apply --replace   # purge the 3 collections first, then write
```

| Flag | |
|---|---|
| `--db` | sqlite file, required on purpose |
| `--source` | path to the Hugo repo, default `../feminizidmap.org` next to this repo |
| `--apply` | boots Strapi against `--db` and writes. Stop the running Strapi first. |
| `--replace` | needed if event/team/publication/report collections already have entries. Purges and recreates them, so admin edits there are lost. |

**Do not move files into the top level of `database/migrations/`.** Strapi runs
every top-level `*.js` there on boot. This subfolder is ignored by Strapi.

`--apply`:
1. copies the DB to `<db>.bak-before-website-content-<ts>`
2. boots Strapi on it. This syncs the schema, so the website tables get created.
3. creates the `en`/`de` locales if missing
4. writes everything in one transaction through the Document Service, all published

## What goes where

| Hugo | Strapi |
|---|---|
| `content/{_index,about,faq,work,imprint,dataprotection}{,.de}.md` | single types home/about/faq/work/imprint/dataprotection, `title` + `content` (blocks). Upsert: re-running overwrites. |
| `{{< partial "logowall.html" >}}` in about | removed from the body, `about.logos` = MvB prize + Prototype Fund (name + url, **no images**) |
| `data/events.yaml` | `event-item`, en + de per event. Shared fields: title, start_date, end_date, place, link, tags. `en.sessions` / `de.sessions` per locale. |
| `data/researchers.yaml` | `team-member`, en + de. Shared: name, active. `text_en` / `text_de` per locale. |
| `data/publications.yaml` | `publication-item`. `link` becomes `links[0]`, followed by `links`; urls only (the English labels `link_name`/`name` are dropped). `project_related: true` → `category: feminizidmap_team`, otherwise `miscellaneous`. Exact duplicates are skipped. |
| `static/reports/*.pdf`, `static/press/*.pdf` | `report` (`REPORTS` in the script, currently 2023): title + `release_date` per locale, shared `report_year`, `report_files` = Report + press release PDF per locale. The PDFs are uploaded to the media library; files with the same name and size are reused. |

### Event dates

The Hugo `date` is German free text. It is parsed into `start_date` / `end_date`:
`20. September 2026` → 2026-09-20, and `10.-11. Oktober 2025` → 2025-10-10 / 2025-10-11.
Any other format aborts the run with the yaml entry, so extend `parseGermanDate` if needed.
`start_time` stays null because Hugo has no times, and none are invented.
Hugo's `past` flag is not migrated; past/upcoming is derived from the dates. A flag
that contradicts the date on the day of the run is listed as a warning.

### Overrides

`overrides/<file>.<locale>.md` replaces the Hugo file for that page and locale
(same front matter + Markdown format). Currently used for:

- `imprint.en.md`: the Hugo English imprint was the German text, so this is an English translation. The legal references (RStV/TMG) are kept as in the German original.

## Markdown → blocks

`markdown-to-blocks.js` (markdown-it, with linkify + typographer like Hugo's Goldmark):

- paragraph, heading, list, blockquote; bold, italic, code, links; softbreak → space, hardbreak → `\n`
- About definitions are quotes nested in a list, which blocks can't represent. Each one becomes its own `quote` block: definition, `\n`, italic citation.
- Strapi rejects bare `#anchor` links, so they are prefixed with the old page path (`#definitions` → `/about#definitions`).
- Any other Markdown construct aborts the run, so nothing is dropped silently.

## Output (this folder, gitignored)

`migration-<ts>-<dryrun|apply>-<db>.md`: summary, warnings (links to old Hugo paths
the frontend must resolve, flattened quotes, missing sessions/texts, skipped
duplicates), a block-by-block preview of every page, the events/team/publications
tables, row counts after apply, and on failure the entry being written plus Strapi's
validation details.

## Tested

On a copy of `strapi.db_13-11.2026`: apply → 6 single types × 2 locales,
9 events × 2, 18 team members × 2, 29 publications. A second `--apply` aborts
(collections not empty). `--replace` gives the same counts. Read back through the
Document Service looked right (DE FAQ, About quotes + logos, Clara-Zetkin sessions
en/de, multi-link publication, event dates incl. Aachen range, upcoming filter, EN imprint).
