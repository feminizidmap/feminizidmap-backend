'use strict';

/**
 * cases-export controller
 */

module.exports = {
  /**
   * Export cases to CSV/TSV format with all filtering capabilities
   */
  async exportToCsv(ctx) {
    try {
      // Extract the query parameters including filters
      const { query } = ctx;
      
      // Log the received query for debugging
      console.log('Received query:', JSON.stringify(query, null, 2));
      
      // Set up the query options with filters and pagination
      const queryOptions = {
        ...query,
        populate: {
          perpetrator: true,
          victim: true,
          address: true,
          source: true,
          crime: true,
          media_labels: true,
          comments: true,
          report_of_crime: true,
          authorities_involved: true,
          media_labels_used: true
        }
      };
      
      console.log('Query options:', JSON.stringify(queryOptions, null, 2));
      
      // Get cases using the case service with the query options
      const { results: cases, pagination } = await strapi.service('api::case.case').find(queryOptions);
      
      console.log(`Found ${cases.length} cases with the applied filters`);
      
      // Log the crime_date of each case for debugging
      cases.forEach(c => {
        console.log(`Case ${c.id} (${c.identifier}): crime_date = ${c.crime_date}`);
      });
      
      // Convert to TSV using our service
      const tsvData = await strapi.service('api::cases-export.cases-export').exportToCsv(cases);
      
      // Set response headers for TSV download
      ctx.set('Content-Type', 'text/tab-separated-values');
      ctx.set('Content-Disposition', 'attachment; filename="cases-export.tsv"');
      
      // Return the TSV data
      return tsvData;
    } catch (err) {
      console.error('Error in cases-export controller:', err);
      ctx.badRequest('Error retrieving cases', { moreDetails: err.message });
    }
  }
}; 