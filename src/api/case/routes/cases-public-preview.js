'use strict';

/**
 * TEMPORARY – demo endpoint. To remove: delete this file,
 * controllers/cases-public-preview.js and the ansible host_vars entry.
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/cases-public-preview',
      handler: 'cases-public-preview.find',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
};
