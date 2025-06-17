/**
 * Migration script to migrate location data to geolocation fields
 * for CRIME, VICTIM, and PERPETRATOR components.
 * 
 * Run with:
 * NODE_ENV=development node src/migrations/04062025_migrate_location_fields/04062025_migrate_location_fields.js
 */

const { createStrapi } = require('@strapi/strapi');
const { simpleGeohash } = require('./utils/geohash');
const { geocodeAddress, delay } = require('./utils/geocode');
const fs = require('fs');
const path = require('path');

// Create timestamped log file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const logFileName = `migration-${timestamp}.log`;
const logFilePath = path.join(__dirname, logFileName);
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Enhanced logging function that writes to both console and file
function log(message) {
  console.log(message);
  logStream.write(`${new Date().toISOString()} - ${message}\n`);
}

function logError(message) {
  console.error(message);
  logStream.write(`${new Date().toISOString()} - ERROR: ${message}\n`);
}

// Component configuration
const COMPONENTS = [
  {
    name: 'crime',
    isArray: false,
    addressField: 'crime_address',
    addressDetailsField: 'crime_address_details',
    geolocationField: 'crime_geolocation',
    cityField: 'crime_geolocation_city',
    stateField: 'crime_geolocation_state',
    postalCodeField: 'crime_geolocation_postal_code'
  },
  {
    name: 'victim',
    isArray: true,
    addressField: 'victim_address',
    addressDetailsField: 'victim_address_details',
    geolocationField: 'victim_geolocation',
    cityField: 'victim_geolocation_city',
    stateField: 'victim_geolocation_state',
    postalCodeField: 'victim_geolocation_postal_code'
  },
  {
    name: 'perpetrator',
    isArray: true,
    addressField: 'perpetrator_address',
    addressDetailsField: 'perpetrator_address_details',
    geolocationField: 'perpetrator_geolocation',
    cityField: 'perpetrator_geolocation_city',
    stateField: 'perpetrator_geolocation_state',
    postalCodeField: 'perpetrator_geolocation_postal_code'
  }
];

/**
 * Build address components from address relation
 */
function buildAddressComponents(addressRelation) {
  return [
    addressRelation.city_name,
    addressRelation.federal_state,
    addressRelation.postal_code
  ].filter(Boolean).join(', ');
}

/**
 * Create updated address details by concatenating existing details with address components
 */
function createUpdatedAddressDetails(existingDetails, addressComponents) {
  if (existingDetails && addressComponents) {
    return `${existingDetails}, ${addressComponents}`;
  }
  return existingDetails || addressComponents || '';
}

/**
 * Process a single component item (crime, victim, or perpetrator)
 */
async function processComponentItem(item, config, stats, itemIndex = null) {
  const logPrefix = itemIndex !== null ? `${config.name}#${itemIndex + 1}` : config.name;
  
  // Check if already has geolocation
  if (item[config.geolocationField]?.coordinates?.lat) {
    stats.migrated++;
    return null;
  }

  // Check for address relation
  const addressRelation = item[config.addressField];
  if (!addressRelation) {
    stats.skip++;
    return null;
  }

  // Check for coordinates in address relation
  if (!addressRelation.latitude || !addressRelation.longitude) {
    stats.skip++;
    return null;
  }

  // Process the component
  const fallbackLat = parseFloat(addressRelation.latitude);
  const fallbackLng = parseFloat(addressRelation.longitude);
  
  // Build address for geocoding
  const addressComponents = buildAddressComponents(addressRelation);
  const updatedAddressDetails = createUpdatedAddressDetails(item[config.addressDetailsField], addressComponents);
  
  // Attempt geocoding
  const geoResult = await geocodeAddress(updatedAddressDetails, fallbackLat, fallbackLng);
  
  // Update stats
  if (geoResult.source === 'osm') {
    stats.geocoded++;
  } else {
    stats.fallback++;
  }
  
  await delay(1000);

  // Create geolocation object
  const geolocation = {
    address: updatedAddressDetails,
    coordinates: { lat: geoResult.lat, lng: geoResult.lng },
    geohash: simpleGeohash(geoResult.lat, geoResult.lng, 12)
  };

  // Return update data
  const updateData = {
    [config.addressField]: addressRelation.id || addressRelation,
    [config.addressDetailsField]: updatedAddressDetails,
    [config.geolocationField]: geolocation,
    [config.cityField]: addressRelation.city_name || '',
    [config.stateField]: addressRelation.federal_state || '',
    [config.postalCodeField]: addressRelation.postal_code || ''
  };

  return updateData;
}

/**
 * Process a single component (handles both single items and arrays)
 */
async function processComponent(caseItem, config, stats) {
  const component = caseItem[config.name];
  
  if (!component) {
    stats.skip++;
    return { status: 'no_data', message: 'no data' };
  }

  if (config.isArray) {
    if (!Array.isArray(component) || component.length === 0) {
      return { status: 'no_data', message: 'empty array' };
    }

    const updatedItems = [];
    let hasUpdates = false;
    let processedCount = 0;
    let migratedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < component.length; i++) {
      const updateData = await processComponentItem(component[i], config, stats, i);
      if (updateData) {
        updatedItems.push({ ...component[i], ...updateData });
        hasUpdates = true;
        processedCount++;
      } else {
        updatedItems.push(component[i]);
        // Check why it was skipped
        if (component[i][config.geolocationField]?.coordinates?.lat) {
          migratedCount++;
        } else {
          skippedCount++;
        }
      }
    }

    if (processedCount > 0) {
      return { status: 'success', data: updatedItems, message: `${processedCount} processed` };
    } else if (migratedCount > 0) {
      return { status: 'already_done', message: `${migratedCount} already migrated` };
    } else {
      return { status: 'no_data', message: `${component.length} items, no address/coords` };
    }
  } else {
    const updateData = await processComponentItem(component, config, stats);
    if (updateData) {
      return { status: 'success', data: updateData, message: 'processed' };
    } else {
      if (component[config.geolocationField]?.coordinates?.lat) {
        return { status: 'already_done', message: 'already migrated' };
      } else {
        return { status: 'no_data', message: 'no address/coords' };
      }
    }
  }
}

/**
 * Main migration function
 */
async function main() {
  log('Initializing Strapi...');
  const strapi = await createStrapi().load();
  log('Strapi initialized successfully');

  try {
    // Fetch all cases
    const cases = await strapi.db.query('api::case.case').findMany({
      populate: {
        crime: { populate: ['crime_address', 'crime_geolocation'] },
        victim: { populate: ['victim_address', 'victim_geolocation'] },
        perpetrator: { populate: ['perpetrator_address', 'perpetrator_geolocation'] }
      }
    });
    
    log(`Found ${cases.length} cases to process\n`);
    
    // Initialize stats
    const stats = {};
    COMPONENTS.forEach(config => {
      stats[config.name] = { success: 0, skip: 0, error: 0, migrated: 0, geocoded: 0, fallback: 0 };
    });
    
    // Process each case
    for (const caseItem of cases) {
      log(`Processing Case ID: ${caseItem.id}`);
      const caseUpdateData = {};
      const componentResults = {};
      let hasUpdates = false;

      // Process each component type
      for (const config of COMPONENTS) {
        try {
          const result = await processComponent(caseItem, config, stats[config.name]);
          componentResults[config.name] = result;
          
          if (result.status === 'success') {
            caseUpdateData[config.name] = result.data;
            hasUpdates = true;
          }
        } catch (error) {
          componentResults[config.name] = { 
            status: 'error', 
            message: error.message 
          };
          stats[config.name].error++;
        }
      }

      // Show component status
      COMPONENTS.forEach(config => {
        const result = componentResults[config.name];
        let icon, message;
        
        switch (result.status) {
          case 'success':
            icon = '✅';
            message = result.message;
            break;
          case 'already_done':
            icon = '📍';
            message = result.message;
            break;
          case 'no_data':
            icon = '⚠️';
            message = result.message;
            break;
          case 'error':
            icon = '❌';
            message = result.message;
            break;
          default:
            icon = '❓';
            message = 'unknown';
        }
        
        log(`  ${config.name}: ${icon} ${message}`);
      });

      // Update case if needed
      if (hasUpdates) {
        try {
          await strapi.entityService.update('api::case.case', caseItem.id, { data: caseUpdateData });
          
          // Update success stats
          COMPONENTS.forEach(config => {
            if (caseUpdateData[config.name]) {
              stats[config.name].success++;
            }
          });
          
          log(`  Case ${caseItem.id}: Updated successfully`);
        } catch (error) {
          logError(`  Case ${caseItem.id}: Update failed - ${error.message}`);
          
          // Update error stats
          COMPONENTS.forEach(config => {
            if (caseUpdateData[config.name]) {
              stats[config.name].error++;
            }
          });
        }
      }
      log(''); // Empty line for readability
    }
    
    // Print final statistics
    log('=== MIGRATION COMPLETED ===');
    COMPONENTS.forEach(config => {
      const stat = stats[config.name];
      log(`\n--- ${config.name.toUpperCase()} SUMMARY ---`);
      log(`✅ Successfully updated: ${stat.success}`);
      log(`⏭️  Skipped: ${stat.skip}`);
      log(`📍 Already migrated: ${stat.migrated}`);
      log(`🌐 Geocoded via OSM: ${stat.geocoded}`);
      log(`🏙️  Used city fallback: ${stat.fallback}`);
      log(`❌ Errors: ${stat.error}`);
    });

  } catch (error) {
    logError('Error in migration:');
    logError(error.message);
  } finally {
    log(`\nMigration log saved to: ${logFilePath}`);
    logStream.end();
    process.exit(0);
  }
}

// Execute migration
main().catch(err => {
  logError('Unhandled error:');
  logError(err.message);
  logStream.end();
  process.exit(1);
}); 