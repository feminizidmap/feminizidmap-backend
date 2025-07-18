'use strict';

/**
 * cases-public controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::case.case', ({ strapi }) => ({
  // Shared serialization function
  serializeCase(caseItem) {
    return {
      id: caseItem.id,
      identifier: caseItem.identifier,
      crime_date: caseItem.crime_date,
      registration_date: caseItem.registration_date,
      uuid: caseItem.uuid,
      attempt: caseItem.attempt,
      authority: caseItem.authority,
      notes: caseItem.notes,
      published_at: caseItem.publishedAt,
      created_at: caseItem.createdAt,
      updated_at: caseItem.updatedAt,
      
      // Include populated components with privacy considerations
      victim: caseItem.victim && Array.isArray(caseItem.victim) ? caseItem.victim.map(victim => ({
        id: victim.id,
        age: victim.age,
        family_status: victim.family_status,
        educational_background: victim.educational_background,
        citizenship_type: victim.citizenship_type,
        legal_status: victim.legal_status,
        profession: victim.profession,
        profession_details: victim.profession_details,
        workplace: victim.workplace,
        influence_alcohol: victim.influence_alcohol,
        influence_drugs: victim.influence_drugs,
        drugs_details: victim.drugs_details,
        reports_on_violence: victim.reports_on_violence,
        reports_on_violence_details: victim.reports_on_violence_details,
        relationship_perpetrator: victim.relationship_perpetrator,
        type_of_feminicide: victim.type_of_feminicide,
        type_of_feminicide_details: victim.type_of_feminicide_details,
        surviving_dependents: victim.surviving_dependents,
        victim_address: victim.victim_address,
        victim_address_details: victim.victim_address_details,
        victim_geolocation_city: victim.victim_geolocation_city,
        victim_geolocation_state: victim.victim_geolocation_state,
        victim_geolocation_postal_code: victim.victim_geolocation_postal_code,
        // Note: Excluding personal names (firstname, lastname) for privacy
        // Note: Excluding detailed address components for privacy
      })) : [],
      
      perpetrator: caseItem.perpetrator && Array.isArray(caseItem.perpetrator) ? caseItem.perpetrator.map(perpetrator => ({
        id: perpetrator.id,
        age: perpetrator.age,
        is_suspect: perpetrator.is_suspect,
        profession: perpetrator.profession,
        profession_details: perpetrator.profession_details,
        educational_background: perpetrator.educational_background,
        family_status: perpetrator.family_status,
        citizenship_type: perpetrator.citizenship_type,
        legal_status: perpetrator.legal_status,
        judical_status: perpetrator.judical_status,
        judical_status_details: perpetrator.judical_status_details,
        committed_suicide: perpetrator.committed_suicide,
        suicide_details: perpetrator.suicide_details,
        sentence: perpetrator.sentence,
        sentence_details: perpetrator.sentence_details,
        influence_alcohol: perpetrator.influence_alcohol,
        influence_drugs: perpetrator.influence_drugs,
        drugs_details: perpetrator.drugs_details,
        mental_illness: perpetrator.mental_illness,
        mental_illness_details: perpetrator.mental_illness_details,
        criminal_record: perpetrator.criminal_record,
        restraining_order: perpetrator.restraining_order,
        gender: perpetrator.gender,
        gender_details: perpetrator.gender_details,
        perpetrator_address: perpetrator.perpetrator_address,
        perpetrator_address_details: perpetrator.perpetrator_address_details,
        perpetrator_geolocation_city: perpetrator.perpetrator_geolocation_city,
        perpetrator_geolocation_state: perpetrator.perpetrator_geolocation_state,
        perpetrator_geolocation_postal_code: perpetrator.perpetrator_geolocation_postal_code,
        verdict_binding: perpetrator.verdict_binding,
        verdict_binding_details: perpetrator.verdict_binding_details,
        // Note: Excluding personal names (firstname, lastname) for privacy
        // Note: Excluding detailed address components for privacy
        // Note: Excluding private fields like criminal_record_details and restraining_order_details
      })) : [],
      
      crime: caseItem.crime ? {
        id: caseItem.crime.id,
        location_of_body: caseItem.crime.location_of_body,
        location_details: caseItem.crime.location_details,
        further_acts_of_violence: caseItem.crime.further_acts_of_violence,
        weapons: caseItem.crime.weapons,
        weapon_details: caseItem.crime.weapon_details,
        motives: caseItem.crime.motives,
        motive_details: caseItem.crime.motive_details,
        cause_of_death: caseItem.crime.cause_of_death,
        description_of_crimescene: caseItem.crime.description_of_crimescene,
        detailed_location_of_body: caseItem.crime.detailed_location_of_body,
        other_victims: caseItem.crime.other_victims,
        acts_of_violence_details: caseItem.crime.acts_of_violence_details,
        crime_address: caseItem.crime.crime_address,
        crime_address_details: caseItem.crime.crime_address_details,
        location_level_1: caseItem.crime.location_level_1,
        location_level_2: caseItem.crime.location_level_2,
        location_level_3: caseItem.crime.location_level_3,
        crime_geolocation_state: caseItem.crime.crime_geolocation_state,
        crime_geolocation_city: caseItem.crime.crime_geolocation_city,
        crime_geolocation_postal_code: caseItem.crime.crime_geolocation_postal_code,
        // Note: Excluding detailed geolocation coordinates for privacy
      } : null,
      
      source: caseItem.source && Array.isArray(caseItem.source) ? caseItem.source.map(source => ({
        id: source.id,
        url: source.url,
        source_types: source.source_types,
        source_type_details: source.source_type_details,
        pdf_created: source.pdf_created
      })) : [],
      
      address: caseItem.address ? {
        id: caseItem.address.id,
        // Add address fields as needed for privacy
      } : null
    };
  },

  // Override the find method to only return published cases
  async find(ctx) {
    // Add filter to only get published cases
    ctx.query.filters = {
      ...ctx.query.filters,
      publishedAt: {
        $notNull: true
      }
    };

    // Add population for components
    ctx.query.populate = {
      ...ctx.query.populate,
      victim: true,
      perpetrator: true,
      crime: true,
      source: true,
      address: true
    };

    // Call the parent find method with our custom filter
    const { data, meta } = await super.find(ctx);

    // Use shared serialization for multiple cases
    const serializedData = data.map(caseItem => this.serializeCase(caseItem));

    return {
      data: serializedData,
      meta
    };
  },

  // Override the findOne method to only return published cases
  async findOne(ctx) {
    // Add filter to only get published cases
    ctx.query.filters = {
      ...ctx.query.filters,
      publishedAt: {
        $notNull: true
      }
    };

    // Add population for components
    ctx.query.populate = {
      ...ctx.query.populate,
      victim: true,
      perpetrator: true,
      crime: true,
      source: true,
      address: true
    };

    // Call the parent findOne method with our custom filter
    const { data } = await super.findOne(ctx);

    if (!data) {
      return ctx.notFound('Case not found or not published');
    }

    // Use shared serialization for single case
    const serializedData = this.serializeCase(data);

    return {
      data: serializedData
    };
  }
})); 