'use strict';

const https = require('https');

const NOMINATIM_HOSTNAME = 'nominatim.openstreetmap.org';
const USER_AGENT = 'FeminizidmapBackend/1.0 (feminizidmap.org; info@feminizidmap.org)';

// Nominatim reverse geocoding request
function nominatimReverseGeocodeRequest(lat, lon) {
  return new Promise((resolve) => {
    const options = {
      hostname: NOMINATIM_HOSTNAME,
      path: `/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=en`,
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT },
    };

    const req = https.request(options, (res) => {
      let rawData = '';
      res.on('data', (chunk) => rawData += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const jsonData = JSON.parse(rawData);
            if (jsonData?.address) {
              const addr = jsonData.address;
              resolve({
                postal_code: addr.postcode || null,
                city: addr.city || addr.town || addr.village || null,
                state: addr.state || addr.county || null,
              });
            } else {
              resolve(null);
            }
          } catch (e) {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(5000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

// Simple delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Process and update a single component
async function processComponent(componentId, componentType, geocodingCount) {
  if (!componentId) return geocodingCount;

  // Use exact schema names
  const schemaMap = {
    'crime': 'crime.crime',
    'victim': 'victim.victim',
    'perpetrator': 'perpretrator.perpetrator' // Directory is misspelled
  };

  const schema = schemaMap[componentType];
  if (!schema) return geocodingCount;

  try {
    const component = await strapi.db.query(schema).findOne({
      where: { id: componentId },
      populate: [`${componentType}_geolocation`]
    });

    if (!component) {
      return geocodingCount;
    }

    const geoField = component?.[`${componentType}_geolocation`];
    if (!geoField?.coordinates?.lat || !geoField?.coordinates?.lng) {
      return geocodingCount;
    }

    // Rate limiting
    if (geocodingCount > 0) await delay(1100);

    const { lat, lng } = geoField.coordinates;
    const geoData = await nominatimReverseGeocodeRequest(lat, lng);
    
    if (geoData) {
      await strapi.db.query(schema).update({
        where: { id: componentId },
        data: {
          [`${componentType}_geolocation_city`]: geoData.city,
          [`${componentType}_geolocation_state`]: geoData.state,
          [`${componentType}_geolocation_postal_code`]: geoData.postal_code,
        }
      });
    }
    
    return geocodingCount + 1;
  } catch (error) {
    return geocodingCount;
  }
}

// Main geocoding function
async function geocodeCase(caseResult) {
  let geocodingCount = 0;

  // Process crime (single)
  if (caseResult.crime?.id) {
    geocodingCount = await processComponent(caseResult.crime.id, 'crime', geocodingCount);
  }

  // Process victims (array)
  if (Array.isArray(caseResult.victim)) {
    for (const victim of caseResult.victim) {
      if (victim?.id) {
        geocodingCount = await processComponent(victim.id, 'victim', geocodingCount);
      }
    }
  }

  // Process perpetrators (array)
  if (Array.isArray(caseResult.perpetrator)) {
    for (const perpetrator of caseResult.perpetrator) {
      if (perpetrator?.id) {
        geocodingCount = await processComponent(perpetrator.id, 'perpetrator', geocodingCount);
      }
    }
  }
}

module.exports = {
  async afterCreate(event) {
    await geocodeCase(event.result);
  },
  async afterUpdate(event) {
    // For updates, fetch the full case with components since event.result might be incomplete
    try {
      const fullCase = await strapi.documents('api::case.case').findOne({
        documentId: event.result.documentId || event.result.id,
        populate: {
          crime: true,
          victim: true,
          perpetrator: true
        }
      });
      
      if (fullCase) {
        await geocodeCase(fullCase);
      }
    } catch (error) {}
  },
}; 