'use strict';

/**
 * TEMPORARY – demo endpoint. To remove: delete this file,
 * routes/cases-public-preview.js and the ansible host_vars entry.
 *
 * All cases with a crime date from 2019 to 2026, each in its latest state,
 * incl. unpublished drafts (unreviewed data!). Serialized like cases-public.
 * `published_at` is null for cases that were never published (the map shows
 * those as drafts). Not paginated.
 */

const { PUBLIC_POPULATE, serializeCase } = require('../utils/public-case');

const RANGE = { crime_date: { $gte: '2019-01-01', $lte: '2026-12-31' } };

module.exports = ({ strapi }) => ({
  async find() {
    const [latest, published] = await Promise.all([
      // Every document has a draft version in Strapi 5, so status 'draft' returns
      // each case exactly once, in its latest state (published or not).
      strapi.documents('api::case.case').findMany({
        status: 'draft',
        filters: RANGE,
        populate: PUBLIC_POPULATE,
      }),
      // Draft versions always have publishedAt = null, so the published status
      // comes from the published versions.
      strapi.documents('api::case.case').findMany({
        status: 'published',
        filters: RANGE,
        fields: ['documentId', 'publishedAt'],
      }),
    ]);

    const publishedAt = new Map(published.map(caseItem => [caseItem.documentId, caseItem.publishedAt]));

    const data = latest
      .sort((a, b) => (a.crime_date ?? '').localeCompare(b.crime_date ?? ''))
      .map(caseItem => ({
        ...serializeCase(caseItem),
        published_at: publishedAt.get(caseItem.documentId) ?? null,
      }));

    return {
      data,
      meta: { total: data.length },
    };
  },
});
