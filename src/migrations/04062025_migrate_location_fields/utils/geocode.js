/**
 * Geocode an address using OpenStreetMap Nominatim API
 * @param {string} address - The address to geocode
 * @param {number} fallbackLat - Fallback latitude if geocoding fails
 * @param {number} fallbackLng - Fallback longitude if geocoding fails
 * @returns {Promise<{lat: number, lng: number, source: string}>}
 */
async function geocodeAddress(address, fallbackLat, fallbackLng) {
  try {
    // Construct the Nominatim API URL
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=5&countrycodes=de&addressdetails=1`;
    
    // Make the request with proper headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Feminizidmap-Backend/1.0 (https://feminizidmap.org)'
      }
    });
    
    if (!response.ok) {
      return { lat: fallbackLat, lng: fallbackLng, source: 'fallback' };
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      // Filter out road-level results and ensure we get proper city/town locations
      const preferredResult = data.find(result => {
        // Skip road-level results
        if (result.class === 'highway' || result.addresstype === 'road') {
          return false;
        }
        
        // Look for city/town level results
        return (
          // Check address type
          ['city', 'town', 'village', 'suburb', 'neighbourhood'].includes(result.addresstype) ||
          // Or check if it has city/town in the address
          (result.address && (result.address.city || result.address.town || result.address.village))
        );
      }) || data[0]; // Fallback to first result if no preferred type found
      
      const lat = parseFloat(preferredResult.lat);
      const lng = parseFloat(preferredResult.lon);
      
      return { lat, lng, source: 'osm' };
    } else {
      return { lat: fallbackLat, lng: fallbackLng, source: 'fallback' };
    }
  } catch (error) {
    return { lat: fallbackLat, lng: fallbackLng, source: 'fallback' };
  }
}

/**
 * Add delay to respect OSM rate limits
 * @param {number} ms - Milliseconds to wait
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  geocodeAddress,
  delay
}; 