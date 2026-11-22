'use strict';

/**
 * dataprotection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dataprotection.dataprotection');
