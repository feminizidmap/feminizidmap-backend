'use strict';

const { v4: uuidv4 } = require('uuid');
const { ValidationError } = require('@strapi/utils').errors;

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    data.uuid = uuidv4();
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    if ('publishedAt' in data) {
      // Check if the operation is attempting to publish the case
      const isPublishing = data.publishedAt !== null;
      if (isPublishing) {
        // Fetch the current entry from the database
        const currentEntry = await strapi.entityService.findOne('api::case.case', where.id, { fields: ['review', 'review2'] });

        // Determine the values to check
        const review = 'review' in data ? data.review : currentEntry.review;
        const review2 = 'review2' in data ? data.review2 : currentEntry.review2;

        if (!review || !review2) {
          throw new ValidationError('Both review and review2 must be true to publish this case');
        }
      }
    }
  },
};

