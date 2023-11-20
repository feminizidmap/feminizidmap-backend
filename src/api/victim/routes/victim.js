'use strict';

/**
 * victim router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::victim.victim');
