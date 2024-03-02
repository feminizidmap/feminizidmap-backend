'use strict';

module.exports = {
  casesPublic: async () => {
    try {
      const entries = await strapi.entityService.findMany('api::case.case', {
        populate: '*'
      });

      let entriesReduced;

      if (entries && Array.isArray(entries)) {
        entriesReduced = entries.reduce((acc, item) => {
          acc = acc || [];
          acc.push({
            identifier: item?.identifier,
            summary: item.summary || "",
            foo: { bar: "batz" }
          });
          return acc;
        }, []);
      }

      return entriesReduced;

    } catch (err) {
      return err;
    }
  }
};
