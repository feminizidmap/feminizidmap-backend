# Reports API — Frontend Handover

New collection type: **`[Website] Reports`** (API UID `api::report.report`).

## Fields

| Field     | Type                    | Notes                                   |
|-----------|-------------------------|------------------------------------------|
| `title`   | string                  | required                                  |
| `date`    | date                    | required, ISO 8601 `YYYY-MM-DD`           |
| `content` | blocks (rich text)      | Strapi Blocks JSON, see rendering note below |

Draft & Publish is enabled. The public API only ever returns published entries, so an entry won't show up until someone clicks "Publish" on it in the admin.

## One-time setup still needed (admin UI)

Permissions aren't granted yet — `GET /api/reports` currently returns `403 Forbidden`. Someone with admin access needs to go to:

**Settings → Users & Permissions Plugin → Roles → Public → Report** and enable `find` and `findOne`.

## Endpoints

- `GET /api/reports` — list, paginated (default 25/page)
- `GET /api/reports?sort=date:desc` — newest first
- `GET /api/reports?pagination[page]=1&pagination[pageSize]=50`
- `GET /api/reports/:documentId` — single entry

## Example response (Strapi v5 shape — no `attributes` wrapper)

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "a1b2c3d4e5f6g7h8i9j0k1l2",
      "title": "Example report title",
      "date": "2026-03-01",
      "content": [
        { "type": "paragraph", "children": [{ "type": "text", "text": "Some text" }] }
      ],
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z",
      "publishedAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 1 }
  }
}
```

## Rendering `content`

`content` is Strapi's native Blocks format — an array of nodes (`paragraph`, `heading`, `list`, `quote`, `image`, …) with inline marks (bold/italic/link/etc.) on the text nodes inside `children`. It is not HTML or Markdown.

- React frontend: use [`@strapi/blocks-react-renderer`](https://www.npmjs.com/package/@strapi/blocks-react-renderer) and pass `content` straight into `<BlocksRenderer content={...} />`.
- Other stacks: implement a small renderer against the block schema documented at https://docs.strapi.io/cms/features/blocks.
