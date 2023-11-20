'use strict';

/**
 * suicide-after-crime service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::suicide-after-crime.suicide-after-crime');
