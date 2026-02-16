'use strict';

/**
 * cases-public router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/cases-public',
      handler: 'cases-public.find',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/cases-public/:id',
      handler: 'cases-public.findOne',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
}; 