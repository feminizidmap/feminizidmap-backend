'use strict';

/**
 * criminal-act service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::criminal-act.criminal-act');
