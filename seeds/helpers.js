// Delete
const deleteItem = async (strapi, collection, id) => {
  await strapi.db.query(`api::${collection}.${collection}`).delete({
    where: { id },
  });
};

// Delete all items of resource (singleType || collection!)
const deleteAllItems = async (strapi, collection) => {
  const items = await strapi.db.query(`api::${collection}.${collection}`).findMany({
    populate: { localizations: true }
  });

  for (const item of items) {
    await deleteItem(strapi, collection, item.id);
  }
};

// Create
const createItem = async (strapi, collection, data) => {
  const createdItem = await strapi.entityService.create(`api::${collection}.${collection}`, {
    data: {
      ...data,
      publishedAt: new Date().toISOString()
    }
  });
  return createdItem.id;
};

module.exports = {
  createItem,
  deleteItem,
  deleteAllItems,
};
