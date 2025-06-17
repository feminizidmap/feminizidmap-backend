module.exports = ({ env }) => ({
  "strapi-csv-import-export": {
    config: {
      authorizedExports: ["api::case.case"],
      authorizedImports: ["api::case.case"]
    }
  },
  'transformer': {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      }
    }
  }
});
