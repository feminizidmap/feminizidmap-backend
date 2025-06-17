/**
 * Simple geohash implementation
 * Based on https://github.com/davetroy/geohash-js/blob/master/geohash.js
 */

/**
 * Generate a geohash for given latitude and longitude coordinates
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate  
 * @param {number} precision - Number of characters in the geohash (default: 12)
 * @returns {string} - The generated geohash
 */
function simpleGeohash(latitude, longitude, precision = 12) {
  const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
  let geohash = "";
  let even = true;
  let bit = 0;
  let ch = 0;
  
  let latMin = -90, latMax = 90;
  let lonMin = -180, lonMax = 180;
  
  while (geohash.length < precision) {
    if (even) {
      const mid = (lonMin + lonMax) / 2;
      if (longitude > mid) {
        ch |= 1 << (4 - bit);
        lonMin = mid;
      } else {
        lonMax = mid;
      }
    } else {
      const mid = (latMin + latMax) / 2;
      if (latitude > mid) {
        ch |= 1 << (4 - bit);
        latMin = mid;
      } else {
        latMax = mid;
      }
    }
    
    even = !even;
    
    if (bit < 4) {
      bit++;
    } else {
      geohash += BASE32.charAt(ch);
      bit = 0;
      ch = 0;
    }
  }
  
  return geohash;
}

module.exports = {
  simpleGeohash
}; 