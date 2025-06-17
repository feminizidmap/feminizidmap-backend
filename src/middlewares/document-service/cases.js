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
      const { data } = context.params;
      const documentId = context.params.id; // In v4/v5, id is usually in context.params.id for update/publish
      let review, review2;

      let currentReviewStatus = { review: data?.review, review2: data?.review2 };

      if (documentId) { // This implies an update or publish action on an existing document
        const currentEntry = await strapi.entityService.findOne('api::case.case', documentId, {
          fields: ['review', 'review2']
        });
        
        if (currentEntry) {
            currentReviewStatus.review = 'review' in data ? data.review : currentEntry.review;
            currentReviewStatus.review2 = 'review2' in data ? data.review2 : currentEntry.review2;
        } else if (isPublishAction) {
            // This case should ideally not happen if publishing an existing documentId
            throw new ValidationError('Case not found for publishing.');
        }
        // If currentEntry is null on an update, it means the entry doesn't exist, which is an issue.
        // However, for a create action that might also set publishedAt (if allowed by model), documentId would be null.
        // The current logic correctly defaults to data.review/data.review2 if documentId is not present.
      }
      // For a direct create with publishedAt set (if possible), documentId will be undefined,
      // and we will use the review statuses from the payload (data.review, data.review2).
      
      review = currentReviewStatus.review;
      review2 = currentReviewStatus.review2;

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
