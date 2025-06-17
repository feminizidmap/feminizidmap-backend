# Location Fields Migration

Refactored migration script to migrate location data from address relations to geolocation fields for **CRIME**, **VICTIM**, and **PERPETRATOR** components.

## Key Features

- ✅ **Zero Code Duplication**: Single reusable function handles all component types
- ✅ **Enhanced Address Concatenation**: Automatically appends city, state, and postal code to address_details
- ✅ **Smart Geocoding**: Uses OpenStreetMap Nominatim API for precise coordinates  
- ✅ **Fallback Protection**: Falls back to city coordinates if geocoding fails
- ✅ **Rate Limiting**: Respects OSM API limits (1 request/second)
- ✅ **Idempotent**: Can be run multiple times safely
- ✅ **Clean Logging**: Concise progress reporting with emoji indicators

## Usage

### Development
```bash
NODE_ENV=development node src/migrations/04062025_migrate_location_fields/04062025_migrate_location_fields.js
```

### Production  
```bash
NODE_ENV=production node src/migrations/04062025_migrate_location_fields/04062025_migrate_location_fields.js
```

## How it works

1. **Component Configuration**: Uses a declarative config to handle all three component types
2. **Address Enhancement**: Concatenates `city_name`, `federal_state`, and `postal_code` to existing `address_details`
3. **Smart Processing**: Handles both single components (crime) and arrays (victim/perpetrator)
4. **Geocoding**: Attempts OSM geocoding for enhanced coordinates, falls back to city coordinates
5. **Atomic Updates**: Updates entire cases with all modified components at once

## Address Processing

The script now automatically enhances addresses:
- **If address_details exists**: `"existing details, Berlin, Berlin, 10117"`
- **If no address_details**: `"Berlin, Berlin, 10117"`

## Output Format

Creates geolocation fields with this structure:
```json
{
  "address": "Alexanderplatz 1, Berlin, Berlin, 10178",
  "coordinates": {
    "lat": 52.5200066,
    "lng": 13.4049540
  },
  "geohash": "u33db8c0ub8e"
}
```

## Statistics

Provides comprehensive statistics with emoji indicators:
- ✅ Successfully updated
- ⏭️ Skipped (no address/coordinates)  
- 📍 Already migrated
- 🌐 Geocoded via OSM
- 🏙️ Used city fallback
- ❌ Errors

## Architecture

- **Main Script**: `04062025_migrate_location_fields.js` - Refactored, clean implementation
- **Geocoding**: `utils/geocode.js` - OSM Nominatim integration
- **Geohash**: `utils/geohash.js` - Coordinate hashing utility

## Migration Date

Created: June 4, 2025 