'use strict';

/**
 * citizenship service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::citizenship.citizenship');
