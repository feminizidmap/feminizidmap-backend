'use strict';

/**
 * cause-of-death service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cause-of-death.cause-of-death');
