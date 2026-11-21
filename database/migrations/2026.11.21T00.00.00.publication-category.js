'use strict';

/**
 * publication-item: the boolean `project_related` becomes the enumeration `category`.
 *
 * Strapi runs this once on boot, before the schema sync. The sync then drops the
 * `project_related` column, because it is no longer in the content-type schema.
 *
 *   project_related = true  → feminizidmap_team
 *   project_related = false → miscellaneous
 *
 * Category `external_using_our_data` is new, so editors have to assign it by hand.
 * No-op on fresh databases and on databases that are already migrated.
 */
const TABLE = 'publication_items';

module.exports = {
  async up(knex) {
    if (!(await knex.schema.hasTable(TABLE))) return;
    if (!(await knex.schema.hasColumn(TABLE, 'project_related'))) return;

    if (!(await knex.schema.hasColumn(TABLE, 'category'))) {
      await knex.schema.alterTable(TABLE, (table) => {
        table.string('category');
      });
    }

    await knex(TABLE).update({
      category: knex.raw("CASE WHEN project_related THEN 'feminizidmap_team' ELSE 'miscellaneous' END"),
    });
  },
};
