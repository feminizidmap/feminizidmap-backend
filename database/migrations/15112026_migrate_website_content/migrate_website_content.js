'use strict';

/**
 * Migrates the textual content of the Hugo site (feminizidmap.org) into the
 * Strapi website content types. Only the report PDFs (REPORTS) are uploaded;
 * other assets (images, linked PDFs) are not migrated.
 *
 *   node database/migrations/15112026_migrate_website_content/migrate_website_content.js \
 *     --db database/<file> [--source ../feminizidmap.org] [--apply] [--replace]
 *
 * Dry run by default: parses the Hugo repo and writes the run log, does not
 * boot Strapi and does not touch the DB.
 * --apply boots Strapi against --db (schema sync!), backs the file up first and
 * writes everything through the Document Service in one transaction.
 *
 * NOTE: lives in a subfolder on purpose. Strapi auto-runs every top-level
 * *.js in database/migrations/ on boot; subfolders are ignored.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { markdownToBlocks, blockText, collectLinks } = require('./markdown-to-blocks');

const LOCALES = ['en', 'de'];

// Hugo content file (without .md / .de.md) -> single type uid
const PAGES = [
  { file: '_index', uid: 'api::home.home' },
  { file: 'about', uid: 'api::about.about' },
  { file: 'faq', uid: 'api::faq.faq' },
  { file: 'work', uid: 'api::work.work' },
  { file: 'imprint', uid: 'api::imprint.imprint' },
  { file: 'dataprotection', uid: 'api::dataprotection.dataprotection' },
];

// Replaces {{< partial "logowall.html" >}} (themes/feminicide-theme/layouts/partials/logowall.html).
// Images are assets -> not migrated, upload them in the admin.
const ABOUT_LOGOS = [
  {
    name: 'Margherita-von-Brentano-Preis',
    url: 'https://www.mvbz.fu-berlin.de/termine/20211116_mvb-preisverleihung_2021.html',
  },
  { name: 'Prototype Fund', url: 'https://prototypefund.de/project/feminizidmap/' },
];

// Reports and their files (Hugo static/, paths relative to --source). Hugo had no report type;
// the PDFs were linked from the home page and publications.yaml. Files are uploaded to the media library.
const REPORTS = [
  {
    report_year: 2023,
    release_date: '2026-03-08',
    byLocale: {
      de: {
        title: 'Offizieller Bericht zu Feminiziden in Deutschland 2023',
        files: [
          { title: 'Report', path: 'static/reports/Feminizidmap-Report-2023.pdf' },
          { title: 'Pressemitteilung', path: 'static/press/PRESSEMITTEILUNG_Feminizidmap_8Maerz2026.pdf' },
        ],
      },
      en: {
        title: 'Official report on feminicides in Germany 2023',
        files: [
          { title: 'Report', path: 'static/reports/Feminizidmap-Report-2023-EN.pdf' },
          { title: 'Press release', path: 'static/press/PRESS_RELEASE_Feminizidmap_8March2026.pdf' },
        ],
      },
    },
  },
];

const UID = {
  event: 'api::event-item.event-item',
  team: 'api::team-member.team-member',
  publication: 'api::publication-item.publication-item',
  report: 'api::report.report',
};

// ---------- args ----------

function parseArgs(argv) {
  const args = { apply: false, replace: false, db: null, source: path.resolve(__dirname, '../../../../feminizidmap.org') };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--apply') args.apply = true;
    else if (argv[i] === '--replace') args.replace = true;
    else if (argv[i] === '--db') args.db = argv[++i];
    else if (argv[i] === '--source') args.source = path.resolve(argv[++i]);
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  if (!args.db) throw new Error('--db <path to sqlite file> is required (no default on purpose)');
  args.db = path.resolve(args.db);
  if (!fs.existsSync(args.db)) throw new Error(`DB file not found: ${args.db}`);
  if (!fs.existsSync(path.join(args.source, 'config.toml'))) {
    throw new Error(`Not a Hugo repo (no config.toml): ${args.source}`);
  }
  return args;
}

// ---------- read Hugo ----------

function readFrontMatter(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no front matter`);
  return { meta: yaml.load(m[1]) || {}, body: m[2] };
}

const readYaml = (src, name) => yaml.load(fs.readFileSync(path.join(src, 'data', name), 'utf8')) || [];

const empty = (v) => v === undefined || v === null || String(v).trim() === '';
const tags = (list) => (list || []).map((label) => ({ label: String(label) }));

function buildPages(src, warnings) {
  const pages = [];
  for (const { file, uid } of PAGES) {
    for (const locale of LOCALES) {
      const hugoRel = `content/${file}${locale === 'en' ? '' : `.${locale}`}.md`;
      const hugoAbs = path.join(src, hugoRel);
      if (!fs.existsSync(hugoAbs)) throw new Error(`Missing ${hugoRel}`);

      // overrides/<file>.<locale>.md replaces the Hugo file (e.g. the English imprint, which is German in Hugo)
      const override = path.join(__dirname, 'overrides', `${file}.${locale}.md`);
      const useOverride = fs.existsSync(override);
      const rel = useOverride ? `overrides/${file}.${locale}.md` : hugoRel;
      if (useOverride) warnings.push(`${hugoRel}: override used (${rel})`);
      // slug for anchor rewriting always comes from the Hugo file
      const hugoMeta = readFrontMatter(hugoAbs).meta;
      const { meta, body } = readFrontMatter(useOverride ? override : hugoAbs);
      if (empty(meta.title)) throw new Error(`${rel}: no title`);
      const { blocks, shortcodes, notes } = markdownToBlocks(body, rel);

      const data = { title: String(meta.title), content: blocks };
      for (const sc of shortcodes) {
        if (uid === 'api::about.about' && sc.includes('logowall.html')) {
          data.logos = ABOUT_LOGOS;
          warnings.push(`${rel}: shortcode \`${sc}\` replaced by \`logos\` (${ABOUT_LOGOS.length} entries, no images)`);
        } else {
          throw new Error(`${rel}: unhandled shortcode ${sc}`);
        }
      }
      for (const n of notes) warnings.push(`${rel}: ${n}`);

      // Strapi rejects bare "#anchor" link urls -> prefix with the page's old Hugo path
      const hugoPath = `${locale === 'en' ? '' : `/${locale}`}/${file === '_index' ? '' : String(hugoMeta.slug || file).toLowerCase()}`;
      const links = blocks.flatMap((b) => collectLinks(b)).filter((u) => /^[/#]/.test(u));
      for (const u of links) {
        warnings.push(
          u.startsWith('#')
            ? `${rel}: anchor \`${u}\` rewritten to \`${hugoPath}${u}\` (old Hugo site)`
            : `${rel}: internal link \`${u}\` points to the old Hugo site`
        );
      }
      const fixAnchors = (node) => {
        if (node.type === 'link' && node.url.startsWith('#')) node.url = `${hugoPath}${node.url}`;
        (node.children || []).forEach(fixAnchors);
      };
      blocks.forEach(fixAnchors);

      pages.push({ uid, locale, rel, data });
    }
  }
  return pages;
}

const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const GERMAN_DATE = new RegExp(`^(\\d{1,2})\\.(?:\\s*-\\s*(\\d{1,2})\\.)?\\s+(${MONTHS.join('|')})\\s+(\\d{4})$`);

/** "20. September 2026" / "10.-11. Oktober 2025" -> { start_date, end_date } (ISO, local dates) */
function parseGermanDate(str) {
  const m = String(str).trim().match(GERMAN_DATE);
  if (!m) return null;
  const [, d1, d2, month, year] = m;
  const iso = (d) => `${year}-${String(MONTHS.indexOf(month) + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const valid = (d) => {
    const dt = new Date(`${iso(d)}T00:00:00Z`);
    return dt.getUTCDate() === Number(d);
  };
  if (!valid(d1) || (d2 && (!valid(d2) || Number(d2) <= Number(d1)))) return null;
  return { start_date: iso(d1), end_date: d2 ? iso(d2) : null };
}

function buildEvents(src, warnings) {
  const today = new Date().toISOString().slice(0, 10);
  return readYaml(src, 'events.yaml').map((e, i) => {
    if (empty(e.event_title)) throw new Error(`events.yaml #${i + 1}: no event_title`);
    const dates = parseGermanDate(e.date ?? '');
    if (!dates) throw new Error(`events.yaml #${i + 1} "${e.event_title}": cannot parse date "${e.date}"`);
    // `past` is not migrated (derived from the dates); only report stale flags
    const isPast = (dates.end_date || dates.start_date) < today;
    if (typeof e.past === 'boolean' && e.past !== isPast) {
      warnings.push(`events.yaml: "${e.event_title}" (${e.date}) has stale \`past: ${e.past}\` in Hugo; ignored, derived from the date now`);
    }
    const shared = {
      event_title: e.event_title,
      ...dates,
      start_time: null, // yaml has no times; never invent one
      place: empty(e.place) ? null : String(e.place),
      link: empty(e.link) ? null : String(e.link),
      tags: tags(e.tags),
    };
    const byLocale = {};
    for (const locale of LOCALES) {
      const sessions = (e[locale] && e[locale].sessions) || [];
      byLocale[locale] = { ...shared, sessions: sessions.map((text) => ({ text: String(text) })) };
    }
    const missing = LOCALES.filter((l) => !byLocale[l].sessions.length);
    if (missing.length) warnings.push(`events.yaml: "${e.event_title}" has no sessions for ${missing.join(', ')}`);
    return { label: e.event_title, byLocale };
  });
}

function buildTeam(src, warnings) {
  return readYaml(src, 'researchers.yaml').map((r, i) => {
    if (empty(r.name)) throw new Error(`researchers.yaml #${i + 1}: no name`);
    const shared = { name: String(r.name), active: r.active === true };
    const byLocale = {
      en: { ...shared, text: empty(r.text_en) ? null : String(r.text_en) },
      de: { ...shared, text: empty(r.text_de) ? null : String(r.text_de) },
    };
    const missing = LOCALES.filter((l) => byLocale[l].text === null);
    if (missing.length && shared.active) {
      warnings.push(`researchers.yaml: active member "${r.name}" has no text for ${missing.join(', ')}`);
    }
    return { label: r.name, byLocale };
  });
}

function buildPublications(src, warnings) {
  const seen = new Set();
  const out = [];
  readYaml(src, 'publications.yaml').forEach((p, i) => {
    if (empty(p.title)) throw new Error(`publications.yaml #${i + 1}: no title`);
    const links = [];
    // Only urls: the yaml labels (`link_name`, `links[].name`) are English-only; the frontend shows a translated "Link".
    if (!empty(p.link)) links.push({ url: String(p.link) });
    for (const l of p.links || []) {
      if (empty(l.url)) throw new Error(`publications.yaml #${i + 1}: link without url`);
      links.push({ url: String(l.url) });
    }
    // The yaml only knows `project_related`; `external_using_our_data` has to be assigned in the admin.
    const category = p.project_related === true ? 'feminizidmap_team' : 'miscellaneous';
    const data = { title: String(p.title), category, links, tags: tags(p.tags) };
    const key = JSON.stringify(data);
    if (seen.has(key)) {
      warnings.push(`publications.yaml #${i + 1}: exact duplicate of an earlier entry, skipped ("${p.title}")`);
      return;
    }
    seen.add(key);
    for (const l of links.filter((l) => /^\/|\/\/(www\.)?feminizidmap\.org\//.test(l.url))) {
      warnings.push(`publications.yaml #${i + 1}: link \`${l.url}\` points to the old Hugo site`);
    }
    out.push({ label: p.title, data });
  });
  return out;
}

function buildReports(src) {
  return REPORTS.map((r) => {
    const byLocale = {};
    for (const locale of LOCALES) {
      const { title, files } = r.byLocale[locale];
      byLocale[locale] = {
        title,
        files: files.map((f) => {
          const abs = path.join(src, f.path);
          if (!fs.existsSync(abs)) throw new Error(`report ${r.report_year} (${locale}): file not found: ${f.path}`);
          return { title: f.title, path: abs, rel: f.path, size: fs.statSync(abs).size };
        }),
      };
    }
    return { label: `${r.report_year}`, report_year: r.report_year, release_date: r.release_date, byLocale };
  });
}

// ---------- run log ----------

const cell = (v) =>
  v === null || v === undefined || v === '' ? '–' : String(v).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ⏎ ');
const short = (s, n = 80) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const table = (head, rows) =>
  rows.length
    ? [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`)].join('\n')
    : '_none_';

function renderLog({ args, mode, started, plan, warnings, result, error }) {
  const { pages, events, team, publications } = plan;
  const out = [];
  out.push(`# website content migration — ${mode.toUpperCase()}`, '');
  out.push(table(['', ''], [
    ['DB', `\`${args.db}\``],
    ['Source', `\`${args.source}\``],
    ['Mode', mode + (args.replace ? ' (--replace)' : '')],
    ['Started', started],
    ['Finished', new Date().toISOString()],
    ['Backup', result && result.backup ? `\`${result.backup}\`` : '–'],
    ['Result', error ? `FAILED: ${error.message}` : result ? result.summary : 'dry run, nothing written'],
  ]));
  out.push('', '## Summary', '');
  out.push(table(['Target', 'Entries', 'Locales'], [
    ['single types', pages.length / LOCALES.length, LOCALES.join(', ')],
    [UID.event, events.length, LOCALES.join(', ')],
    [UID.team, team.length, LOCALES.join(', ')],
    [UID.publication, publications.length, '– (not localized)'],
  ]));

  out.push('', `## Warnings (${warnings.length})`, '');
  out.push(warnings.length ? warnings.map((w) => `- ${w}`).join('\n') : '_none_');

  out.push('', '## Pages', '');
  for (const p of pages) {
    out.push(`### ${p.uid} · ${p.locale} · ${p.rel}`, '', `**${p.data.title}**`, '');
    out.push(table(['#', 'Block', 'Text'], p.data.content.map((b, i) => [
      i + 1,
      b.type + (b.level ? ` h${b.level}` : '') + (b.format ? ` ${b.format}` : ''),
      short(blockText(b)),
    ])));
    if (p.data.logos) out.push('', `logos: ${p.data.logos.map((l) => l.name).join(', ')}`);
    out.push('');
  }

  out.push('## Events', '');
  out.push(table(['#', 'Title', 'Start', 'End', 'Time', 'Place', 'Tags', 'Sessions en', 'Sessions de'], events.map((e, i) => [
    i + 1, e.byLocale.en.event_title, e.byLocale.en.start_date, e.byLocale.en.end_date, e.byLocale.en.start_time, e.byLocale.en.place,
    e.byLocale.en.tags.map((t) => t.label).join(', '),
    e.byLocale.en.sessions.length, e.byLocale.de.sessions.length,
  ])));

  out.push('', '## Team members', '');
  out.push(table(['#', 'Name', 'Active', 'Text en', 'Text de'], team.map((t, i) => [
    i + 1, t.label, t.byLocale.en.active, t.byLocale.en.text && short(t.byLocale.en.text, 50), t.byLocale.de.text && short(t.byLocale.de.text, 50),
  ])));

  out.push('', '## Publications', '');
  out.push(table(['#', 'Title', 'Category', 'Links', 'Tags'], publications.map((p, i) => [
    i + 1, short(p.label, 70), p.data.category, p.data.links.map((l) => l.url).join(', '),
    p.data.tags.map((t) => t.label).join(', '),
  ])));

  out.push('', '## Reports', '');
  out.push(table(['Year', 'Released', 'Locale', 'Title', 'Files'], plan.reports.flatMap((r) => LOCALES.map((locale) => [
    r.report_year, r.release_date, locale, r.byLocale[locale].title,
    r.byLocale[locale].files.map((f) => `${f.title}: \`${f.rel}\``).join(', '),
  ]))));

  if (result && result.counts) {
    out.push('', '## Read back after apply', '');
    out.push(table(['Target', 'Rows (all locales, draft+published)'], Object.entries(result.counts)));
  }
  if (error) {
    out.push('', '## Error', '');
    if (error.context) out.push(`While writing: ${error.context}`, '');
    if (error.details) out.push('```json', JSON.stringify(error.details, null, 2), '```', '');
    out.push('```', error.stack || String(error), '```');
  }
  return out.join('\n') + '\n';
}

// ---------- apply ----------

/** upload a local file to the media library, or reuse one with the same name and size; returns its id */
async function uploadFile(strapi, f) {
  const name = path.basename(f.path);
  const sizeKb = Math.round((f.size / 1000) * 100) / 100; // Strapi stores the size in KB
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name, size: sizeKb } });
  if (existing) return existing.id;

  // The upload service reads from `filepath`; hand it a copy so the Hugo repo is never touched.
  const tmp = path.join(fs.mkdtempSync(path.join(require('os').tmpdir(), 'femmap-upload-')), name);
  fs.copyFileSync(f.path, tmp);
  try {
    const [file] = await strapi.plugin('upload').service('upload').upload({
      data: { fileInfo: { name } },
      files: { filepath: tmp, originalFilename: name, mimetype: 'application/pdf', size: f.size },
    });
    return file.id;
  } finally {
    fs.rmSync(path.dirname(tmp), { recursive: true, force: true });
  }
}

/** run one write, tagging any error with what was being written */
async function step(context, fn) {
  try {
    return await fn();
  } catch (e) {
    e.context = e.context || context;
    throw e;
  }
}

async function apply(args, plan) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const backup = `${args.db}.bak-before-website-content-${ts}`;
  fs.copyFileSync(args.db, backup);

  process.env.DATABASE_CLIENT = 'sqlite';
  process.env.DATABASE_FILENAME = args.db;
  // boot from the project root so config/ and src/ resolve
  process.chdir(path.resolve(__dirname, '../../..'));
  const { compileStrapi, createStrapi } = require('@strapi/strapi');
  const strapi = await createStrapi(await compileStrapi()).load();

  try {
    const locales = strapi.plugin('i18n').service('locales');
    for (const code of LOCALES) {
      if (!(await locales.findByCode(code))) {
        await locales.create({ code, name: code === 'de' ? 'German (de)' : 'English (en)' });
      }
    }

    const collections = [UID.event, UID.team, UID.publication, UID.report];
    const existing = {};
    for (const uid of collections) existing[uid] = await strapi.db.query(uid).count();
    const nonEmpty = collections.filter((uid) => existing[uid] > 0);
    if (nonEmpty.length && !args.replace) {
      throw new Error(`Collections not empty: ${nonEmpty.map((u) => `${u} (${existing[u]})`).join(', ')}. Use --replace to purge them first.`);
    }

    // Uploads write to disk, so they run outside the transaction. A file with the same name and
    // size already in the media library is reused, so re-runs don't create duplicates.
    const uploadIds = new Map();
    for (const report of plan.reports) {
      for (const locale of LOCALES) {
        for (const f of report.byLocale[locale].files) {
          uploadIds.set(f.path, await step(`upload ${f.rel}`, () => uploadFile(strapi, f)));
        }
      }
    }

    await strapi.db.transaction(async () => {
      if (args.replace) {
        for (const uid of nonEmpty) {
          const rows = await strapi.db.query(uid).findMany({ select: ['documentId'] });
          for (const documentId of new Set(rows.map((r) => r.documentId))) {
            await strapi.documents(uid).delete({ documentId, locale: '*' });
          }
        }
      }

      // single types: upsert per locale
      for (const p of plan.pages) {
        const row = await strapi.db.query(p.uid).findOne({ select: ['documentId'] });
        await step(`${p.uid} ${p.locale} (${p.rel})`, () =>
          row
            ? strapi.documents(p.uid).update({ documentId: row.documentId, locale: p.locale, data: p.data, status: 'published' })
            : strapi.documents(p.uid).create({ locale: p.locale, data: p.data, status: 'published' })
        );
      }

      // localized collections: create en, then add de to the same document (yaml order = id order)
      for (const [uid, items] of [[UID.event, plan.events], [UID.team, plan.team]]) {
        for (const item of items) {
          const doc = await step(`${uid} en "${item.label}"`, () =>
            strapi.documents(uid).create({ locale: 'en', data: item.byLocale.en, status: 'published' })
          );
          await step(`${uid} de "${item.label}"`, () =>
            strapi.documents(uid).update({ documentId: doc.documentId, locale: 'de', data: item.byLocale.de, status: 'published' })
          );
        }
      }

      for (const p of plan.publications) {
        await step(`${UID.publication} "${p.label}"`, () =>
          strapi.documents(UID.publication).create({ data: p.data, status: 'published' })
        );
      }

      // reports: en first, then de on the same document (report_year is shared, the rest per locale)
      for (const r of plan.reports) {
        const data = (locale) => ({
          title: r.byLocale[locale].title,
          release_date: r.release_date,
          report_year: r.report_year,
          report_files: r.byLocale[locale].files.map((f) => ({ title: f.title, file: uploadIds.get(f.path) })),
        });
        const doc = await step(`${UID.report} en "${r.label}"`, () =>
          strapi.documents(UID.report).create({ locale: 'en', data: data('en'), status: 'published' })
        );
        await step(`${UID.report} de "${r.label}"`, () =>
          strapi.documents(UID.report).update({ documentId: doc.documentId, locale: 'de', data: data('de'), status: 'published' })
        );
      }
    });

    const counts = {};
    for (const uid of [...new Set(plan.pages.map((p) => p.uid)), ...collections]) {
      counts[uid] = await strapi.db.query(uid).count();
    }
    return {
      backup,
      counts,
      summary: `Applied: ${plan.pages.length} page locales, ${plan.events.length} events ×${LOCALES.length}, ${plan.team.length} team members ×${LOCALES.length}, ${plan.publications.length} publications, ${plan.reports.length} reports ×${LOCALES.length} (${uploadIds.size} files)`,
    };
  } finally {
    await strapi.destroy();
  }
}

// ---------- main ----------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const started = new Date().toISOString();
  const mode = args.apply ? 'apply' : 'dryrun';
  const warnings = [];
  const plan = {
    pages: buildPages(args.source, warnings),
    events: buildEvents(args.source, warnings),
    team: buildTeam(args.source, warnings),
    publications: buildPublications(args.source, warnings),
    reports: buildReports(args.source),
  };

  let result = null;
  let error = null;
  if (args.apply) {
    try {
      result = await apply(args, plan);
    } catch (e) {
      error = e;
    }
  }

  const logName = `migration-${started.replace(/[:.]/g, '-')}-${mode}-${path.basename(args.db)}.md`;
  const logPath = path.join(__dirname, logName);
  fs.writeFileSync(logPath, renderLog({ args, mode, started, plan, warnings, result, error }));

  console.log(result ? result.summary : error ? `FAILED: ${error.message}` : 'Dry run, nothing written.');
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Run log: ${logPath}`);
  if (error) process.exit(1);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
