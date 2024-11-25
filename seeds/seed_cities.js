const path = require('path');
const Strapi = require('@strapi/strapi');

const { deleteAllItems, createItem } = require('./helpers');

// Purge & seed
const bootstrap = async () => {
  const strapiInstance = await Strapi().load();

  // Purge cities
  const ressourcesToPurge = ['dropdown-city'];

  for (const ressource of ressourcesToPurge ) {
    await deleteAllItems(strapi, ressource);
  }

  console.log('=> Deleted old city entries\n')


  await createItem(strapiInstance, 'dropdown-city', {
    name: "Aachen",
    postal_code: "52068",
    county: "Städteregion Aachen",
    federal_state: "Nordrhein-Westfalen"
  });

  await createItem(strapiInstance, 'dropdown-city', {
    name: "Aalen",
    postal_code: "73431",
    county: "Ostalbkreis",
    federal_state: "Baden-Württemberg"
  });

  console.log('\n=> Seeding completed')
}

bootstrap();
