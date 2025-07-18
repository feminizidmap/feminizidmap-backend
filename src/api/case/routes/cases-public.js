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
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/cases-public/:id',
      handler: 'cases-public.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    }
  ]
}; 