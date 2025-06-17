module.exports = ({ env }) => ({
  "strapi-csv-import-export": {
    config: {
      authorizedExports: ["api::case.case"],
      authorizedImports: ["api::case.case"]
    }
  }
});
