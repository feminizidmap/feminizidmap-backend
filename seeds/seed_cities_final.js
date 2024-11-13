const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const cliProgress = require('cli-progress');
const Strapi = require('@strapi/strapi');

const { deleteAllItems, createItem } = require('./helpers');

// Purge & seed
const bootstrap = async () => {
  const strapiInstance = await Strapi().load();

  // Purge cities
  const ressourcesToPurge = ['dropdown-city'];

  for (const ressource of ressourcesToPurge ) {
    await deleteAllItems(strapiInstance, ressource);
  }

  console.log('=> Deleted old city entries\n');

  // Read and parse the CSV file
  const filePath = path.join(__dirname, 'zuordnung_plz_ort.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  // Initialize the progress bar
  const totalRecords = records.length;
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(totalRecords, 0);

  // Process each record
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const { ort, plz, landkreis, bundesland } = record;
    const displayName = `${ort} [${plz}, ${landkreis ? `${landkreis}, ` : ''}${bundesland}]`;

    await createItem(strapiInstance, 'dropdown-city', {
      city_name: ort,
      city_name_display: displayName,
      postal_code: plz,
      county: landkreis,
      federal_state: bundesland
    });

    // Update progress bar
    progressBar.update(i + 1);
  }

  progressBar.stop();

  console.log('\n=> Seeding completed');
}

bootstrap();

