'use strict';

const { caseUuidMiddleware, casePublishValidationMiddleware } = require('./middlewares/document-service/cases');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Register case document service middlewares
    strapi.documents.use(caseUuidMiddleware());
    strapi.documents.use(casePublishValidationMiddleware());
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
