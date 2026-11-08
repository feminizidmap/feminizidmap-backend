'use strict';

/**
 * TEMPORARY – demo endpoint. To remove: delete this file,
 * controllers/cases-public-preview-2026.js and the ansible host_vars entry.
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/cases-public-preview-2026',
      handler: 'cases-public-preview-2026.find',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
};
