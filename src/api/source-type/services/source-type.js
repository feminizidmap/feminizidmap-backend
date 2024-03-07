'use strict';

/**
 * source-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::source-type.source-type');
