'use strict';

const { v4: uuidv4 } = require('uuid');
const { errors } = require('@strapi/utils');
const { ValidationError } = errors;
// const https = require('https'); // No longer needed here if only used by the removed middleware

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
    // Only apply to case content type
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
      // For publish action in Strapi v5, we need to get the ID from the result
      let documentId = context.params.id;
      
      // If no ID in params, try to get it from documentId (Strapi v5 uses documentId)
      if (!documentId && context.params.documentId) {
        documentId = context.params.documentId;
      }
      
      // If no ID in params, try to get it from the result (for publish action)
      if (!documentId && context.result && context.result.id) {
        documentId = context.result.id;
      }
      
      // If still no ID, try to get it from the args (for publish action)
      if (!documentId && context.args && context.args.id) {
        documentId = context.args.id;
      }

      let review, review2;

      if (documentId) {
        // This is an update or publish action on an existing document
        // Try to find by documentId first, then by numeric ID
        let currentEntry = await strapi.entityService.findOne('api::case.case', documentId, {
          fields: ['review', 'review2']
        });
        
        // If not found by documentId, try to find by documentId field
        if (!currentEntry) {
          currentEntry = await strapi.db.query('api::case.case').findOne({
            where: { documentId: documentId },
            select: ['review', 'review2']
          });
        }
        
        if (currentEntry) {
          // For publish action, we use the current values from DB
          review = currentEntry.review;
          review2 = currentEntry.review2;
        } else if (isPublishAction) {
          throw new ValidationError('Case not found for publishing.');
        } else {
          // For updates on non-existent documents, use the provided data
          const { data } = context.params;
          review = data?.review;
          review2 = data?.review2;
        }
      } else {
        // This is a create action with publishedAt set (if possible)
        const { data } = context.params;
        review = data?.review;
        review2 = data?.review2;
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

// --- GEOCODING MIDDLEWARE MOVED TO LIFECYCLES ---
/*
const NOMINATIM_HOSTNAME = 'nominatim.openstreetmap.org';
const USER_AGENT = 'FeminizidmapBackend/1.0 (feminizidmap.org; info@feminizidmap.org)';

function nominatimReverseGeocodeRequest(lat, lon) {
  // ... (logic moved to lifecycles.js) ...
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const caseGeocodeOnSaveMiddleware = () => {
  // ... (logic moved to lifecycles.js) ...
};
*/

module.exports = {
  caseUuidMiddleware,
  casePublishValidationMiddleware,
  // caseGeocodeOnSaveMiddleware, // Commented out
};

