/**
 * This file was automatically generated by Strapi.
 * Any modifications made will be discarded.
 */
import googleMaps from "strapi-google-maps/strapi-admin";
import usersPermissions from "@strapi/plugin-users-permissions/strapi-admin";
import strapiCsvImportExport from "strapi-csv-import-export/strapi-admin";
import countrySelect from "strapi-plugin-country-select/strapi-admin";
import { renderAdmin } from "@strapi/strapi/admin";

renderAdmin(document.getElementById("strapi"), {
  plugins: {
    "google-maps": googleMaps,
    "users-permissions": usersPermissions,
    "strapi-csv-import-export": strapiCsvImportExport,
    "country-select": countrySelect,
  },
});
