'use strict';

/**
 * victim service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::victim.victim');
