'use strict';

/**
 * cases-public controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::case.case', ({ strapi }) => ({
  // Override the find method to only return published cases
  async find(ctx) {
    // Add filter to only get published cases
    ctx.query.filters = {
      ...ctx.query.filters,
      publishedAt: {
        $notNull: true
      }
    };

    // Call the parent find method with our custom filter
    const { data, meta } = await super.find(ctx);

    // Custom serialization - simplified for debugging
    const serializedData = data.map(caseItem => ({
      id: caseItem.id,
      identifier: caseItem.identifier,
      crime_date: caseItem.crime_date,
      registration_date: caseItem.registration_date,
      uuid: caseItem.uuid,
      attempt: caseItem.attempt,
      authority: caseItem.authority,
      notes: caseItem.notes,
      published_at: caseItem.publishedAt,
      created_at: caseItem.createdAt,
      updated_at: caseItem.updatedAt
    }));

    return {
      data: serializedData,
      meta
    };
  },

  // Override the findOne method to only return published cases
  async findOne(ctx) {
    // Add filter to only get published cases
    ctx.query.filters = {
      ...ctx.query.filters,
      publishedAt: {
        $notNull: true
      }
    };

    // Call the parent findOne method with our custom filter
    const { data } = await super.findOne(ctx);

    if (!data) {
      return ctx.notFound('Case not found or not published');
    }

    // Custom serialization for single case
    const serializedData = {
      id: data.id,
      identifier: data.identifier,
      crime_date: data.crime_date,
      registration_date: data.registration_date,
      uuid: data.uuid,
      attempt: data.attempt,
      authority: data.authority,
      notes: data.notes,
      published_at: data.publishedAt,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    };

    return {
      data: serializedData
    };
  }
})); 