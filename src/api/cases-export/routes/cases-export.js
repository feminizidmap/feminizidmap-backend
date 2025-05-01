'use strict';

/**
 * cases-export router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/cases-export',
      handler: 'cases-export.exportToCsv',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
}; 