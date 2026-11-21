'use strict';

/**
 * Converts Hugo Markdown to Strapi 5 "blocks" JSON.
 *
 * Mirrors Hugo's Goldmark defaults where they affect text:
 * linkify (bare URLs become links) and typographer (curly quotes, dashes).
 *
 * Supported: paragraph, heading, (un)ordered list, blockquote, bold, italic,
 * inline code, links, soft/hard breaks. Anything else throws, so content is
 * never dropped silently.
 *
 * Special case: a list whose items each contain only a blockquote (About page
 * definitions) becomes one `quote` block per item, because Strapi blocks can't
 * nest a quote inside a list item. Paragraphs of a quote are joined with "\n".
 */

const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

// Hugo shortcodes ({{< ... >}} / {{% ... %}}) on their own line
const SHORTCODE_LINE = /^[ \t]*\{\{[<%].*?[>%]\}\}[ \t]*$/gm;

function stripShortcodes(markdown) {
  const found = markdown.match(SHORTCODE_LINE) || [];
  return { markdown: markdown.replace(SHORTCODE_LINE, ''), shortcodes: found.map((s) => s.trim()) };
}

const sameMarks = (a, b) =>
  ['bold', 'italic', 'code'].every((m) => Boolean(a[m]) === Boolean(b[m]));

function pushText(nodes, text, marks) {
  if (text === '') return;
  const last = nodes[nodes.length - 1];
  if (last && last.type === 'text' && sameMarks(last, marks)) {
    last.text += text;
    return;
  }
  const node = { type: 'text', text };
  if (marks.bold) node.bold = true;
  if (marks.italic) node.italic = true;
  if (marks.code) node.code = true;
  nodes.push(node);
}

/** inline token children -> array of text/link nodes */
function convertInline(children, ctx) {
  const out = [];
  const marks = { bold: 0, italic: 0, code: 0 };
  let link = null; // { node, children }

  const target = () => (link ? link.node.children : out);
  const current = () => ({ bold: marks.bold > 0, italic: marks.italic > 0 });

  for (const t of children) {
    switch (t.type) {
      case 'text':
        pushText(target(), t.content, current());
        break;
      case 'code_inline':
        pushText(target(), t.content, { ...current(), code: true });
        break;
      case 'softbreak':
        pushText(target(), ' ', current());
        break;
      case 'hardbreak':
        pushText(target(), '\n', current());
        break;
      case 'strong_open':
        marks.bold++;
        break;
      case 'strong_close':
        marks.bold--;
        break;
      case 'em_open':
        marks.italic++;
        break;
      case 'em_close':
        marks.italic--;
        break;
      case 'link_open': {
        if (link) throw new Error(`${ctx}: nested link`);
        const url = t.attrGet('href');
        link = { node: { type: 'link', url, children: [] } };
        break;
      }
      case 'link_close':
        if (!link.node.children.length) link.node.children.push({ type: 'text', text: link.node.url });
        out.push(link.node);
        link = null;
        break;
      default:
        throw new Error(`${ctx}: unsupported inline token "${t.type}" (line ${t.map ? t.map[0] + 1 : '?'})`);
    }
  }
  return out.length ? out : [{ type: 'text', text: '' }];
}

/** Concatenate inline arrays with a separator text node */
function joinInline(parts, sep) {
  const out = [];
  parts.forEach((nodes, i) => {
    if (i > 0) pushText(out, sep, {});
    for (const n of nodes) {
      if (n.type === 'text') pushText(out, n.text, n);
      else out.push(n);
    }
  });
  return out.length ? out : [{ type: 'text', text: '' }];
}

/** find index of the matching close token for tokens[i] (an *_open token) */
function findClose(tokens, i) {
  const open = tokens[i].type;
  const close = open.replace(/_open$/, '_close');
  let depth = 0;
  for (let j = i; j < tokens.length; j++) {
    if (tokens[j].type === open) depth++;
    else if (tokens[j].type === close && --depth === 0) return j;
  }
  throw new Error(`unbalanced ${open}`);
}

/** collect the inline contents of all paragraphs in tokens[from..to) */
function paragraphsIn(tokens, from, to, ctx, allowed) {
  const parts = [];
  for (let i = from; i < to; i++) {
    const t = tokens[i];
    if (t.type === 'inline') parts.push(convertInline(t.children, ctx));
    else if (!allowed.has(t.type)) {
      throw new Error(`${ctx}: unsupported block token "${t.type}" (line ${t.map ? t.map[0] + 1 : '?'})`);
    }
  }
  return parts;
}

const PARA = new Set(['paragraph_open', 'paragraph_close']);
const QUOTE_IN_ITEM = new Set([...PARA, 'blockquote_open', 'blockquote_close']);

function convertList(tokens, i, end, ctx, notes) {
  const format = tokens[i].type === 'ordered_list_open' ? 'ordered' : 'unordered';
  const items = [];
  for (let j = i + 1; j < end; j++) {
    if (tokens[j].type !== 'list_item_open') throw new Error(`${ctx}: unexpected "${tokens[j].type}" in list`);
    const close = findClose(tokens, j);
    items.push([j + 1, close]);
    j = close;
  }

  const isQuoteList = items.every(
    ([a, b]) => tokens[a].type === 'blockquote_open' && findClose(tokens, a) === b - 1
  );
  if (isQuoteList) {
    notes.push(`list of ${items.length} blockquotes flattened to ${items.length} quote blocks`);
    return items.map(([a, b]) => ({
      type: 'quote',
      children: joinInline(paragraphsIn(tokens, a, b, ctx, QUOTE_IN_ITEM), '\n'),
    }));
  }

  return [
    {
      type: 'list',
      format,
      children: items.map(([a, b]) => ({
        type: 'list-item',
        children: joinInline(paragraphsIn(tokens, a, b, ctx, PARA), '\n'),
      })),
    },
  ];
}

/**
 * @returns {{ blocks: object[], shortcodes: string[], notes: string[] }}
 */
function markdownToBlocks(markdown, ctx = 'markdown') {
  const stripped = stripShortcodes(markdown);
  const tokens = md.parse(stripped.markdown, {});
  const blocks = [];
  const notes = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    switch (t.type) {
      case 'paragraph_open': {
        blocks.push({ type: 'paragraph', children: convertInline(tokens[i + 1].children, ctx) });
        i += 2;
        break;
      }
      case 'heading_open': {
        blocks.push({
          type: 'heading',
          level: Number(t.tag.slice(1)),
          children: convertInline(tokens[i + 1].children, ctx),
        });
        i += 2;
        break;
      }
      case 'bullet_list_open':
      case 'ordered_list_open': {
        const end = findClose(tokens, i);
        blocks.push(...convertList(tokens, i, end, ctx, notes));
        i = end;
        break;
      }
      case 'blockquote_open': {
        const end = findClose(tokens, i);
        blocks.push({ type: 'quote', children: joinInline(paragraphsIn(tokens, i + 1, end, ctx, PARA), '\n') });
        i = end;
        break;
      }
      default:
        throw new Error(`${ctx}: unsupported block token "${t.type}" (line ${t.map ? t.map[0] + 1 : '?'})`);
    }
  }

  return { blocks, shortcodes: stripped.shortcodes, notes };
}

/** plain text of a block, for previews */
function blockText(node) {
  if (node.type === 'text') return node.text;
  return (node.children || []).map(blockText).join(node.type === 'list' ? ' · ' : '');
}

/** all link urls in a block tree */
function collectLinks(node, acc = []) {
  if (node.type === 'link') acc.push(node.url);
  for (const c of node.children || []) collectLinks(c, acc);
  return acc;
}

module.exports = { markdownToBlocks, blockText, collectLinks };
