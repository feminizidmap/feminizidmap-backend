
/*
 *
 * ============================================================
 * WARNING: THIS FILE HAS BEEN COMMENTED OUT
 * ============================================================
 *
 * CONTEXT:
 *
 * The lifecycles.js file has been commented out to prevent unintended side effects when starting Strapi 5 for the first time after migrating to the document service.
 *
 * STRAPI 5 introduces a new document service that handles lifecycles differently compared to previous versions. Without migrating your lifecycles to document service middlewares, you may experience issues such as:
 *
 * - `unpublish` actions triggering `delete` lifecycles for every locale with a published entity, which differs from the expected behavior in v4.
 * - `discardDraft` actions triggering both `create` and `delete` lifecycles, leading to potential confusion.
 *
 * MIGRATION GUIDE:
 *
 * For a thorough guide on migrating your lifecycles to document service middlewares, please refer to the following link:
 * [Document Services Middlewares Migration Guide](https://docs.strapi.io/dev-docs/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service)
 *
 * IMPORTANT:
 *
 * Simply uncommenting this file without following the migration guide may result in unexpected behavior and inconsistencies. Ensure that you have completed the migration process before re-enabling this file.
 *
 * ============================================================
 */

// 'use strict';
// 
// const { v4: uuidv4 } = require('uuid');
// const { ValidationError } = require('@strapi/utils').errors;
// 
// module.exports = {
//   async beforeCreate(event) {
//     const { data } = event.params;
//     data.uuid = uuidv4();
//   },
// 
//   async beforeUpdate(event) {
//     const { data, where } = event.params;
// 
//     if ('publishedAt' in data) {
//       // Check if the operation is attempting to publish the case
//       const isPublishing = data.publishedAt !== null;
//       if (isPublishing) {
//         // Fetch the current entry from the database
//         const currentEntry = await strapi.entityService.findOne('api::case.case', where.id, { fields: ['review', 'review2'] });
// 
//         // Determine the values to check
//         const review = 'review' in data ? data.review : currentEntry.review;
//         const review2 = 'review2' in data ? data.review2 : currentEntry.review2;
// 
//         if (!review || !review2) {
//           throw new ValidationError('Both review and review2 must be true to publish this case');
//         }
//       }
//     }
//   },
// };
// 
// 