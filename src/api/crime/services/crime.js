'use strict';

/**
 * crime service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::crime.crime');
