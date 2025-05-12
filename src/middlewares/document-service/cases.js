'use strict';

const { v4: uuidv4 } = require('uuid');
const { errors } = require('@strapi/utils');
const { ValidationError } = errors;

/**
 * Case document service middlewares
 */

// Middleware for ensuring a UUID is set on creation
const caseUuidMiddleware = () => {
  return async (context, next) => {
    // Only apply to case content type and create action
    if (context.uid !== 'api::case.case' || context.action !== 'create') {
      return next();
    }

    // Set UUID in the data
    const { data } = context.params;
    context.params.data.uuid = uuidv4();

    // Continue to the next middleware
    return next();
  };
};

// Middleware for validation before publishing a case
const casePublishValidationMiddleware = () => {
  return async (context, next) => {
    // Only apply to case content type and actions that might publish a case
    if (context.uid !== 'api::case.case') {
      return next();
    }

    // Check if this is a publish action or update that changes publishedAt
    const isPublishAction = context.action === 'publish';
    const isUpdateAction = context.action === 'update' && 
                           context.params.data && 
                           'publishedAt' in context.params.data && 
                           context.params.data.publishedAt !== null;

    if (isPublishAction || isUpdateAction) {
      const { data, documentId } = context.params;
      let review, review2;

      // If directly publishing through publish action, we need to check current values
      if (isPublishAction) {
        // Fetch the current entry to check review values
        const currentEntry = await strapi.documents('api::case.case').findOne({
          documentId: documentId,
          fields: ['review', 'review2']
        });
        review = currentEntry.review;
        review2 = currentEntry.review2;
      } else {
        // For update action, check if values are being changed or use current values
        const currentEntry = await strapi.documents('api::case.case').findOne({
          documentId: documentId,
          fields: ['review', 'review2']
        });
        
        review = 'review' in data ? data.review : currentEntry.review;
        review2 = 'review2' in data ? data.review2 : currentEntry.review2;
      }

      // Validate both reviews are true
      if (!review || !review2) {
        throw new ValidationError('Both review and review2 must be true to publish this case');
      }
    }

    // Continue to the next middleware
    return next();
  };
};

module.exports = {
  caseUuidMiddleware,
  casePublishValidationMiddleware,
}; 