'use strict';

/**
 * cases-public controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::case.case', ({ strapi }) => ({
  // Shared serialization function
  serializeCase(caseItem) {
    return {
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
    };
  },

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

    // Use shared serialization for multiple cases
    const serializedData = data.map(caseItem => this.serializeCase(caseItem));

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

    // Use shared serialization for single case
    const serializedData = this.serializeCase(data);

    return {
      data: serializedData
    };
  }
})); 