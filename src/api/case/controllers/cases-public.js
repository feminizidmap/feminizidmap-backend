'use strict';

/**
 * cases-public controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { PUBLIC_POPULATE, serializeCase } = require('../utils/public-case');

module.exports = createCoreController('api::case.case', ({ strapi }) => ({
  async find() {
    const documents = await strapi.documents('api::case.case').findMany({
      status: 'published',
      populate: PUBLIC_POPULATE,
    });

    return {
      data: documents.map(caseItem => serializeCase(caseItem)),
      meta: { total: documents.length },
    };
  },

  async findOne(ctx) {
    const document = await strapi.documents('api::case.case').findOne({
      documentId: ctx.params.id,
      status: 'published',
      populate: PUBLIC_POPULATE,
    });

    if (!document) {
      return ctx.notFound('Case not found or not published');
    }

    return {
      data: serializeCase(document),
    };
  }
}));
