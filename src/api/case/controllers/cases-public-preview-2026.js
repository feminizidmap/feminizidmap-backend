'use strict';

/**
 * TEMPORARY – demo endpoint. To remove: delete this file,
 * routes/cases-public-preview-2026.js and the ansible host_vars entry.
 *
 * Cases from 2023 and 2024 (published only) plus all cases from 2026
 * (latest draft version, incl. unpublished ones). Not paginated.
 */

const { PUBLIC_POPULATE, serializeCase } = require('../utils/public-case');

function yearRange(year) {
  return { crime_date: { $gte: `${year}-01-01`, $lte: `${year}-12-31` } };
}

module.exports = ({ strapi }) => ({
  async find() {
    const [published, current] = await Promise.all([
      strapi.documents('api::case.case').findMany({
        status: 'published',
        filters: { $or: [yearRange(2023), yearRange(2024)] },
        populate: PUBLIC_POPULATE,
      }),
      // Every document has a draft version in Strapi 5, so status 'draft'
      // returns each 2026 case exactly once, in its latest state
      // (published_at is null for all of them).
      strapi.documents('api::case.case').findMany({
        status: 'draft',
        filters: yearRange(2026),
        populate: PUBLIC_POPULATE,
      }),
    ]);

    const data = [...published, ...current]
      .sort((a, b) => (a.crime_date ?? '').localeCompare(b.crime_date ?? ''))
      .map(caseItem => serializeCase(caseItem));

    return {
      data,
      meta: { total: data.length },
    };
  },
});
