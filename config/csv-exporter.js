// for strapi tsconfig
//  "module": "CommonJS",
//  "moduleResolution": "Node",
// use
//
// import type { CSVExporterPlugin } from "strapi-plugin-csv-exporter/dist/server/src";
//
// for
//  "module": "Node16",
//  "moduleResolution": "Node16",
//import type { CSVExporterPlugin } from "strapi-plugin-csv-exporter/strapi-server";

module.exports = {
  // Content type specific configurations
  config: {
    // Configuration for articles content type
    'api::case.case': {
      // Label shown in the dropdown
      dropdownLabel: 'Cases',

      // Columns to export
      columns: ['identifier', 'crime_date', 'attempt'],

      // // Relations as column (optional)
      // relation: {
      //   author: {
      //     column: ['name'],
      //   }
      // },

      // // Filters to apply to the query (optional)
      // filter: {
      //   title: {
      //     $contains: 'Hello',
      //   },
      // },

      // // Status (draft or published, optional)
      status: 'draft', // defaults to draft if not provided

      // // Custom columns to add to the table
      // customColumns: {
      //   'customColumnName': { // This will be used as collumn title
      //     // item contains the element containing all columns and relations to build a custom column
      //     column: (item) => `custom string result with id: ${item.id}`
      //   }
      // }

    },
  },
  // Optional: Fields to globally ignore in exports
  ignore: [], // default
  // Optional: Global date formatting for all fields that are a valid ISO Date
  dateFormat: 'dd.MM.yyyy HH:mm', // default
  // Optional: Formatting for date-only fields
  dateOnlyFormat: 'dd.MM.yyyy', // default
  // Optional: Formatting for time-only fields
  timeFormat: 'HH:mm', // default
  // Optional: Set a *global* IANA time zone identifier or UTC offset (e.g. 'Europe/Berlin' or '+02:00'). Per default, the current timezone of the client will be used to format timestamps. If no timezone can be determined, default will be UTC+00:00)
  timeZone: '+00:00', // default
  // Optional: Protect against CSV injection by prefixing values that a spreadsheet would
  // evaluate as a formula (values starting with =, +, -, @, tab or CR) with a single quote.
  // Plain numbers (-5, +3.2) are left untouched
  escapeFormulas: true, // default
  // Optional: Prefix the file with a UTF-8 byte order mark, to not assume
  // local ANSI code page and mangle umlauts, accents and other non-ASCII characters
  bom: true, // default
  // Optional: How many rows are fetched per database round trip while exporting
  batchSize: 500, // default
  // Optional: Hard cap on exported rows. Unlimited when not set
  maxRows: undefined, // default
};
