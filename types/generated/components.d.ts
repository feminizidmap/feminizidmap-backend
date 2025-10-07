import type { Schema, Struct } from '@strapi/strapi';

export interface AdresseAdresse extends Struct.ComponentSchema {
  collectionName: 'components_adresse_adresses';
  info: {
    description: '';
    displayName: 'Address';
    icon: 'pinMap';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::country-select.country'>;
    county: Schema.Attribute.String;
    dropdown_bundesland: Schema.Attribute.Relation<
      'oneToOne',
      'api::federal-state.federal-state'
    >;
    dropdown_city: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-city.dropdown-city'
    >;
    postal_code: Schema.Attribute.String;
    street: Schema.Attribute.String;
  };
}

export interface CommentsComments extends Struct.ComponentSchema {
  collectionName: 'components_comments_comments';
  info: {
    description: '';
    displayName: 'comments';
    icon: 'feather';
  };
  attributes: {
    comment: Schema.Attribute.String;
  };
}

export interface CrimeCrime extends Struct.ComponentSchema {
  collectionName: 'components_crime_crimes';
  info: {
    description: '';
    displayName: 'crime';
    icon: 'collapse';
  };
  attributes: {
    acts_of_violence_details: Schema.Attribute.Text;
    cause_of_death: Schema.Attribute.Relation<
      'oneToOne',
      'api::violent-act.violent-act'
    >;
    crime_address: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-city.dropdown-city'
    >;
    crime_address_details: Schema.Attribute.String;
    crime_geolocation: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::google-maps.location-picker'>;
    crime_geolocation_city: Schema.Attribute.String;
    crime_geolocation_postal_code: Schema.Attribute.String;
    crime_geolocation_state: Schema.Attribute.String;
    description_of_crimescene: Schema.Attribute.Text;
    detailed_location_of_body: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-details-of-location.dropdown-details-of-location'
    >;
    further_acts_of_violence: Schema.Attribute.Relation<
      'oneToMany',
      'api::violent-act.violent-act'
    >;
    location_details: Schema.Attribute.String;
    location_level_1: Schema.Attribute.Relation<
      'oneToOne',
      'api::location-level-1.location-level-1'
    >;
    location_level_2: Schema.Attribute.Relation<
      'oneToOne',
      'api::location-level-2.location-level-2'
    >;
    location_level_3: Schema.Attribute.Relation<
      'oneToOne',
      'api::location-level-3.location-level-3'
    >;
    location_of_body: Schema.Attribute.Relation<
      'oneToOne',
      'api::location-of-body.location-of-body'
    >;
    motive_details: Schema.Attribute.String;
    motives: Schema.Attribute.Relation<
      'oneToMany',
      'api::dropdown-motive.dropdown-motive'
    >;
    other_victims: Schema.Attribute.Relation<
      'oneToMany',
      'api::dropdown-other-victim.dropdown-other-victim'
    >;
    weapon_details: Schema.Attribute.String;
    weapons: Schema.Attribute.Relation<'oneToMany', 'api::weapon.weapon'>;
  };
}

export interface PerpretratorPerpetrator extends Struct.ComponentSchema {
  collectionName: 'components_perpretrator_perpetrators';
  info: {
    description: '';
    displayName: 'perpetrator';
    icon: 'user';
  };
  attributes: {
    address: Schema.Attribute.Component<'adresse.adresse', false>;
    age: Schema.Attribute.Integer;
    citizenship_country: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::country-select.country'>;
    citizenship_details: Schema.Attribute.Text;
    citizenship_type: Schema.Attribute.Relation<
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
    committed_suicide: Schema.Attribute.Relation<
      'oneToOne',
      'api::suicide-after-crime.suicide-after-crime'
    >;
    criminal_record: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    criminal_record_details: Schema.Attribute.Text & Schema.Attribute.Private;
    drugs_details: Schema.Attribute.String;
    educational_background: Schema.Attribute.Relation<
      'oneToOne',
      'api::educational-background.educational-background'
    >;
    educational_background_details: Schema.Attribute.String;
    family_status: Schema.Attribute.Relation<
      'oneToOne',
      'api::family-status.family-status'
    >;
    family_status_other: Schema.Attribute.String;
    firstname: Schema.Attribute.String;
    gender: Schema.Attribute.Relation<
      'oneToOne',
      'api::gender-perpetrator.gender-perpetrator'
    >;
    gender_details: Schema.Attribute.String;
    influence_alcohol: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    influence_drugs: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    is_suspect: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    judical_status: Schema.Attribute.Relation<
      'oneToOne',
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator'
    >;
    judical_status_details: Schema.Attribute.String;
    lastname: Schema.Attribute.String;
    legal_status: Schema.Attribute.Relation<
      'oneToOne',
      'api::legal-status.legal-status'
    >;
    mental_illness: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    mental_illness_details: Schema.Attribute.String;
    perpetrator_address: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-city.dropdown-city'
    >;
    perpetrator_address_details: Schema.Attribute.String;
    perpetrator_geolocation: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::google-maps.location-picker'>;
    perpetrator_geolocation_city: Schema.Attribute.String;
    perpetrator_geolocation_postal_code: Schema.Attribute.String;
    perpetrator_geolocation_state: Schema.Attribute.String;
    profession: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-job.dropdown-job'
    >;
    profession_details: Schema.Attribute.String;
    restraining_order: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    restraining_order_details: Schema.Attribute.Text & Schema.Attribute.Private;
    sentence: Schema.Attribute.Relation<
      'oneToOne',
      'api::criminal-act.criminal-act'
    >;
    sentence_details: Schema.Attribute.String;
    suicide_details: Schema.Attribute.String;
    verdict_binding: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-verdict-binding.dropdown-verdict-binding'
    >;
    verdict_binding_details: Schema.Attribute.String;
  };
}

export interface SourceSource extends Struct.ComponentSchema {
  collectionName: 'components_source_sources';
  info: {
    description: '';
    displayName: 'source';
    icon: 'earth';
  };
  attributes: {
    pdf_created: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    source_type_details: Schema.Attribute.String;
    source_types: Schema.Attribute.Relation<
      'oneToOne',
      'api::source-type.source-type'
    >;
    url: Schema.Attribute.String;
  };
}

export interface SurvivedBySurvivedBy extends Struct.ComponentSchema {
  collectionName: 'components_survived_by_survived_bies';
  info: {
    description: '';
    displayName: 'survived_by';
  };
  attributes: {
    age: Schema.Attribute.Integer;
    dropdown_hinterbliebene: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent'
    >;
    relation_details: Schema.Attribute.String;
  };
}

export interface VictimVictim extends Struct.ComponentSchema {
  collectionName: 'components_victim_victims';
  info: {
    description: '';
    displayName: 'Victim';
    icon: 'user';
  };
  attributes: {
    address: Schema.Attribute.Component<'adresse.adresse', false>;
    age: Schema.Attribute.Integer;
    citizenship_country: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::country-select.country'>;
    citizenship_details: Schema.Attribute.Text;
    citizenship_type: Schema.Attribute.Relation<
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
    drugs_details: Schema.Attribute.String;
    educational_background: Schema.Attribute.Relation<
      'oneToOne',
      'api::educational-background.educational-background'
    >;
    educational_background_details: Schema.Attribute.String;
    family_status: Schema.Attribute.Relation<
      'oneToOne',
      'api::family-status.family-status'
    >;
    family_status_other: Schema.Attribute.String;
    firstname: Schema.Attribute.String;
    influence_alcohol: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    influence_drugs: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    lastname: Schema.Attribute.String;
    legal_status: Schema.Attribute.Relation<
      'oneToOne',
      'api::legal-status.legal-status'
    >;
    profession: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-job.dropdown-job'
    >;
    profession_details: Schema.Attribute.String;
    relationship_perpetrator: Schema.Attribute.Relation<
      'oneToOne',
      'api::relationship-to-victim.relationship-to-victim'
    >;
    relationship_perpetrator_details: Schema.Attribute.String;
    reports_on_violence: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    reports_on_violence_details: Schema.Attribute.String;
    survived_by: Schema.Attribute.Component<'survived-by.survived-by', true>;
    survived_by_details: Schema.Attribute.String;
    surviving_dependents: Schema.Attribute.Relation<
      'oneToMany',
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent'
    >;
    type_of_feminicide: Schema.Attribute.Relation<
      'oneToOne',
      'api::feminicide-type.feminicide-type'
    >;
    type_of_feminicide_details: Schema.Attribute.String;
    victim_address: Schema.Attribute.Relation<
      'oneToOne',
      'api::dropdown-city.dropdown-city'
    >;
    victim_address_details: Schema.Attribute.String;
    victim_geolocation: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'plugin::google-maps.location-picker'>;
    victim_geolocation_city: Schema.Attribute.String;
    victim_geolocation_postal_code: Schema.Attribute.String;
    victim_geolocation_state: Schema.Attribute.String;
    workplace: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'adresse.adresse': AdresseAdresse;
      'comments.comments': CommentsComments;
      'crime.crime': CrimeCrime;
      'perpretrator.perpetrator': PerpretratorPerpetrator;
      'source.source': SourceSource;
      'survived-by.survived-by': SurvivedBySurvivedBy;
      'victim.victim': VictimVictim;
    }
  }
}
