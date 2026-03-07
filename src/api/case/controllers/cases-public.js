'use strict';

/**
 * cases-public controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

function flattenRelation(rel) {
  return rel?.label ?? null;
}

function flattenRelationArray(rels) {
  return Array.isArray(rels) ? rels.map(r => r.label) : [];
}

/**
 * Deep population config for all components and their nested relations.
 * Keys here MUST match internal Strapi schema field names (not the
 * public-facing names). Renaming happens in serializeCase() below.
 */
const PUBLIC_POPULATE = {
  media_labels: true,
  report_of_crime: true,
  victim: {
    populate: {
      family_status: true,
      // educational_background: true,        // PRIVATE: Bildungshintergrund
      // citizenship_type: true,              // PRIVATE: Staatsbürgerschaft
      // legal_status: true,                  // PRIVATE: related to citizenship
      profession: true,
      // influence_alcohol: true,             // PRIVATE: Alkoholisiert (victim)
      // influence_drugs: true,               // PRIVATE: Drogeneinfluss (victim)
      reports_on_violence: true,
      relationship_perpetrator: true,
      type_of_feminicide: true,
      // surviving_dependents: true,             // LEGACY: replaced by survived_by component
      // victim_address: true,                // PRIVATE: Address (victim)
      survived_by: {
        populate: {
          dropdown_hinterbliebene: true,
        },
      },
    },
  },
  perpetrator: {
    populate: {
      // educational_background: true,        // PRIVATE: not listed as public
      family_status: true,
      profession: true,
      // citizenship_type: true,              // PRIVATE: same as victim
      // legal_status: true,                  // PRIVATE: related to citizenship
      judical_status: true,
      committed_suicide: true,
      sentence: true,
      influence_alcohol: true,
      influence_drugs: true,
      mental_illness: true,
      gender: true,
      criminal_record: true,
      restraining_order: true,
      verdict_binding: true,
    },
  },
  crime: {
    populate: {
      location_of_body: true,
      further_acts_of_violence: true,
      weapons: true,
      motives: true,
      cause_of_death: true,
      detailed_location_of_body: true,
      // other_victims: true,                 // PRIVATE: Weitere Opfer, only on request
      // crime_address: true,                  // LEGACY: replaced by geolocation fields
      location_level_1: true,
      location_level_2: true,
      location_level_3: true,
    },
  },
  // PRIVATE: Source/Links — private, only for researchers
  // source: {
  //   populate: {
  //     source_types: true,
  //   },
  // },
};

module.exports = createCoreController('api::case.case', ({ strapi }) => ({
  // Shared serialization function
  serializeCase(caseItem) {
    return {
      identifier: caseItem.identifier,
      crime_date: caseItem.crime_date,
      registration_date: caseItem.registration_date,
      uuid: caseItem.uuid,
      attempt: caseItem.attempt,
      // authority: caseItem.authority,       // PRIVATE: Behörden
      // notes: caseItem.notes,               // PRIVATE: internal notes
      media_labels: flattenRelationArray(caseItem.media_labels),
      media_labels_details: caseItem.media_labels_details,
      report_of_crime: flattenRelation(caseItem.report_of_crime),
      report_of_crime_details: caseItem.report_of_crime_details,
      published_at: caseItem.publishedAt,
      created_at: caseItem.createdAt,
      updated_at: caseItem.updatedAt,

      // Include populated components with privacy considerations
      victims: caseItem.victim && Array.isArray(caseItem.victim) ? caseItem.victim.map(victim => ({
        age: victim.age,
        family_status: flattenRelation(victim.family_status),
        family_status_other: victim.family_status_other,
        // educational_background: victim.educational_background,             // PRIVATE: Bildungshintergrund
        // educational_background_details: victim.educational_background_details, // PRIVATE: Bildungshintergrund
        // citizenship_type: victim.citizenship_type,                         // PRIVATE: Staatsbürgerschaft
        // citizenship_details: victim.citizenship_details,                   // PRIVATE: Staatsbürgerschaft
        // citizenship_country: victim.citizenship_country,                   // PRIVATE: Staatsbürgerschaft
        // legal_status: victim.legal_status,                                 // PRIVATE: related to citizenship
        profession: flattenRelation(victim.profession),
        profession_details: victim.profession_details,
        // workplace: victim.workplace,                                       // PRIVATE: Arbeitsplatz
        // influence_alcohol: victim.influence_alcohol,                       // PRIVATE: Alkoholisiert (victim)
        // influence_drugs: victim.influence_drugs,                           // PRIVATE: Drogeneinfluss (victim)
        // drugs_details: victim.drugs_details,                               // PRIVATE: Drogeneinfluss (victim)
        reports_on_violence: flattenRelation(victim.reports_on_violence),
        // reports_on_violence_details: victim.reports_on_violence_details,   // PRIVATE: free text
        relationship_perpetrator: flattenRelation(victim.relationship_perpetrator),
        relationship_perpetrator_details: victim.relationship_perpetrator_details,
        type_of_feminicide: flattenRelation(victim.type_of_feminicide),
        type_of_feminicide_details: victim.type_of_feminicide_details,
        surviving_dependants: victim.survived_by && Array.isArray(victim.survived_by) ? victim.survived_by.map(s => ({
          relationship_to_victim: flattenRelation(s.dropdown_hinterbliebene),
          relationship_to_victim_details: s.relation_details,
          age: s.age,
        })) : [],
        // victim_address: victim.victim_address,                             // PRIVATE: Address (victim)
        // victim_address_details: victim.victim_address_details,             // PRIVATE: Address (victim)
        // victim_geolocation_city: victim.victim_geolocation_city,           // PRIVATE: Address (victim)
        // victim_geolocation_state: victim.victim_geolocation_state,         // PRIVATE: Address (victim)
        // victim_geolocation_postal_code: victim.victim_geolocation_postal_code, // PRIVATE: Address (victim)
        // Note: Excluding personal names (firstname, lastname) for privacy
        // Note: Excluding victim_geolocation (exact coordinates) for privacy
        // Note: Excluding nested address component for privacy
      })) : [],

      perpetrators: caseItem.perpetrator && Array.isArray(caseItem.perpetrator) ? caseItem.perpetrator.map(perpetrator => ({
        age: perpetrator.age,
        // is_suspect: perpetrator.is_suspect,                                // PRIVATE: Mögliche(r) Verdächtige(r)
        profession: flattenRelation(perpetrator.profession),
        profession_details: perpetrator.profession_details,
        // educational_background: perpetrator.educational_background,        // PRIVATE: not listed as public
        // educational_background_details: perpetrator.educational_background_details, // PRIVATE
        family_status: flattenRelation(perpetrator.family_status),
        family_status_other: perpetrator.family_status_other,
        // citizenship_type: perpetrator.citizenship_type,                    // PRIVATE: same as victim
        // citizenship_details: perpetrator.citizenship_details,              // PRIVATE: same as victim
        // citizenship_country: perpetrator.citizenship_country,              // PRIVATE: same as victim
        // legal_status: perpetrator.legal_status,                            // PRIVATE: related to citizenship
        judical_status: flattenRelation(perpetrator.judical_status),
        judical_status_details: perpetrator.judical_status_details,
        committed_suicide: flattenRelation(perpetrator.committed_suicide),
        suicide_details: perpetrator.suicide_details,
        sentence: flattenRelation(perpetrator.sentence),
        sentence_details: perpetrator.sentence_details,
        influence_alcohol: flattenRelation(perpetrator.influence_alcohol),
        influence_drugs: flattenRelation(perpetrator.influence_drugs),
        // drugs_details: perpetrator.drugs_details,                          // PRIVATE: Drogeneinfluss free text
        mental_illness: flattenRelation(perpetrator.mental_illness),
        // mental_illness_details: perpetrator.mental_illness_details,        // PRIVATE: Psychische Vorerkrankungen free text
        criminal_record: flattenRelation(perpetrator.criminal_record),
        restraining_order: flattenRelation(perpetrator.restraining_order),
        gender: flattenRelation(perpetrator.gender),
        gender_details: perpetrator.gender_details,
        // perpetrator_address: perpetrator.perpetrator_address,              // LEGACY: replaced by geolocation fields
        // perpetrator_address_details: perpetrator.perpetrator_address_details, // PRIVATE: address details
        perpetrator_city: perpetrator.perpetrator_geolocation_city,
        perpetrator_state: perpetrator.perpetrator_geolocation_state,
        // perpetrator_postal_code: perpetrator.perpetrator_geolocation_postal_code, // PRIVATE: too specific
        verdict_binding: flattenRelation(perpetrator.verdict_binding),
        verdict_binding_details: perpetrator.verdict_binding_details,
        // Note: Excluding personal names (firstname, lastname) for privacy
        // Note: Excluding perpetrator_geolocation (exact coordinates) for privacy
        // Note: Excluding nested address component for privacy
        // Note: Excluding private fields: criminal_record_details, restraining_order_details
      })) : [],

      crime: caseItem.crime ? {
        location_of_body: flattenRelation(caseItem.crime.location_of_body),
        // location_details: caseItem.crime.location_details,                 // PRIVATE: don't publish street name
        further_acts_of_violence: flattenRelationArray(caseItem.crime.further_acts_of_violence),
        weapons: flattenRelationArray(caseItem.crime.weapons),
        weapon_details: caseItem.crime.weapon_details,
        motives: flattenRelationArray(caseItem.crime.motives),
        motive_details: caseItem.crime.motive_details,
        cause_of_death: flattenRelation(caseItem.crime.cause_of_death),
        // description_of_crimescene: caseItem.crime.description_of_crimescene, // PRIVATE: keep for researchers on request
        detailed_location_of_body: flattenRelation(caseItem.crime.detailed_location_of_body),
        // other_victims: caseItem.crime.other_victims,                       // PRIVATE: Weitere Opfer, only on request
        acts_of_violence_details: caseItem.crime.acts_of_violence_details,
        // crime_address: caseItem.crime.crime_address,                       // LEGACY: replaced by geolocation fields
        // crime_address_details: caseItem.crime.crime_address_details,       // PRIVATE: street-level details
        location_level_1: flattenRelation(caseItem.crime.location_level_1),
        location_level_2: flattenRelation(caseItem.crime.location_level_2),
        location_level_3: flattenRelation(caseItem.crime.location_level_3),
        crime_state: caseItem.crime.crime_geolocation_state,
        crime_city: caseItem.crime.crime_geolocation_city,
        crime_postal_code: caseItem.crime.crime_geolocation_postal_code,
        crime_lat: caseItem.crime.crime_geolocation?.lat ?? null,
        crime_lng: caseItem.crime.crime_geolocation?.lng ?? null,
      } : null,

      // PRIVATE: Source/Links — private, only for researchers
      // source: caseItem.source && Array.isArray(caseItem.source) ? caseItem.source.map(source => ({
      //   url: source.url,
      //   source_types: source.source_types,
      //   source_type_details: source.source_type_details,
      //   pdf_created: source.pdf_created,
      //   comment: source.comment,
      // })) : [],

      // Note: Top-level address component removed — victim, perpetrator, and
      // crime each carry their own address/geolocation fields already.
    };
  },

  async find(ctx) {
    const { page = 1, pageSize = 25 } = ctx.query.pagination || {};

    const [documents, total] = await Promise.all([
      strapi.documents('api::case.case').findMany({
        status: 'published',
        populate: PUBLIC_POPULATE,
        pagination: { page: Number(page), pageSize: Math.min(Number(pageSize), 10000) },
      }),
      strapi.documents('api::case.case').count({ status: 'published' }),
    ]);

    const effectivePageSize = Math.min(Number(pageSize), 10000);

    return {
      data: documents.map(caseItem => this.serializeCase(caseItem)),
      meta: {
        pagination: {
          page: Number(page),
          pageSize: effectivePageSize,
          pageCount: Math.ceil(total / effectivePageSize),
          total,
        },
      },
    };
  },

  async findOne(ctx) {
    const document = await strapi.documents('api::case.case').findOne({
      documentId: ctx.params.id,
      status: 'published',
      populate: PUBLIC_POPULATE,
    });

    if (!document) {
      return ctx.notFound('Case not found or not published');
    }

    return {
      data: this.serializeCase(document),
    };
  }
}));
