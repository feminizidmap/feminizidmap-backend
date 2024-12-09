import type { Attribute, Schema } from '@strapi/strapi';

export interface AdresseAdresse extends Schema.Component {
  collectionName: 'components_adresse_adresses';
  info: {
    description: '';
    displayName: 'Address';
    icon: 'pinMap';
  };
  attributes: {
    city: Attribute.String;
    country: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    county: Attribute.String;
    dropdown_bundesland: Attribute.Relation<
      'adresse.adresse',
      'oneToOne',
      'api::federal-state.federal-state'
    >;
    dropdown_city: Attribute.Relation<
      'adresse.adresse',
      'oneToOne',
      'api::dropdown-city.dropdown-city'
    >;
    postal_code: Attribute.String;
    street: Attribute.String & Attribute.Private;
  };
}

export interface CommentsComments extends Schema.Component {
  collectionName: 'components_comments_comments';
  info: {
    description: '';
    displayName: 'comments';
    icon: 'feather';
  };
  attributes: {
    comment: Attribute.String & Attribute.Private;
  };
}

export interface CrimeCrime extends Schema.Component {
  collectionName: 'components_crime_crimes';
  info: {
    description: '';
    displayName: 'crime';
    icon: 'collapse';
  };
  attributes: {
    acts_of_violence_details: Attribute.Text;
    cause_of_death: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::violent-act.violent-act'
    >;
    crime_address: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::dropdown-city.dropdown-city'
    >;
    crime_address_details: Attribute.String;
    description_of_crimescene: Attribute.Text;
    detailed_location_of_body: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::dropdown-details-of-location.dropdown-details-of-location'
    >;
    further_acts_of_violence: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::violent-act.violent-act'
    >;
    location_details: Attribute.String;
    location_level_1: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::location-level-1.location-level-1'
    >;
    location_level_2: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::location-level-2.location-level-2'
    >;
    location_level_3: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::location-level-3.location-level-3'
    >;
    location_of_body: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::location-of-body.location-of-body'
    >;
    motive_details: Attribute.String;
    motives: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::dropdown-motive.dropdown-motive'
    >;
    other_victims: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::dropdown-other-victim.dropdown-other-victim'
    >;
    weapon_details: Attribute.String;
    weapons: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::weapon.weapon'
    >;
  };
}

export interface PerpretratorPerpetrator extends Schema.Component {
  collectionName: 'components_perpretrator_perpetrators';
  info: {
    description: '';
    displayName: 'perpetrator';
    icon: 'user';
  };
  attributes: {
    address: Attribute.Component<'adresse.adresse'>;
    age: Attribute.Integer;
    cititzenship: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    citizenship_details: Attribute.Text & Attribute.Private;
    citizenship_type: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
    committed_suicide: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::suicide-after-crime.suicide-after-crime'
    >;
    criminal_record: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    criminal_record_details: Attribute.Text & Attribute.Private;
    drugs_details: Attribute.String;
    educational_background: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::educational-background.educational-background'
    >;
    family_status: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::family-status.family-status'
    >;
    family_status_other: Attribute.String;
    firstname: Attribute.String;
    gender: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::gender-perpetrator.gender-perpetrator'
    >;
    gender_details: Attribute.String;
    influence_alcohol: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    influence_drugs: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    is_suspect: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    judical_status: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator'
    >;
    judical_status_details: Attribute.String;
    lastname: Attribute.String;
    legal_status: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::legal-status.legal-status'
    >;
    mental_illness: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    mental_illness_details: Attribute.String;
    perpetrator_address: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-city.dropdown-city'
    >;
    perpetrator_address_details: Attribute.String;
    profession: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-job.dropdown-job'
    >;
    profession_details: Attribute.String;
    restraining_order: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    restraining_order_details: Attribute.Text & Attribute.Private;
    sentence: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::criminal-act.criminal-act'
    >;
    sentence_details: Attribute.String;
    suicide_details: Attribute.String;
  };
}

export interface SourceSource extends Schema.Component {
  collectionName: 'components_source_sources';
  info: {
    description: '';
    displayName: 'source';
    icon: 'earth';
  };
  attributes: {
    pdf_created: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    source_type_details: Attribute.String;
    source_types: Attribute.Relation<
      'source.source',
      'oneToOne',
      'api::source-type.source-type'
    >;
    url: Attribute.String;
  };
}

export interface SurvivedBySurvivedBy extends Schema.Component {
  collectionName: 'components_survived_by_survived_bies';
  info: {
    description: '';
    displayName: 'survived_by';
  };
  attributes: {
    age: Attribute.Integer;
    dropdown_hinterbliebene: Attribute.Relation<
      'survived-by.survived-by',
      'oneToOne',
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent'
    >;
    relation_details: Attribute.String;
  };
}

export interface VictimVictim extends Schema.Component {
  collectionName: 'components_victim_victims';
  info: {
    description: '';
    displayName: 'Victim';
    icon: 'user';
  };
  attributes: {
    address: Attribute.Component<'adresse.adresse'>;
    age: Attribute.Integer;
    citizenship: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    citizenship_details: Attribute.Text & Attribute.Private;
    citizenship_type: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
    drugs_details: Attribute.String;
    educational_background: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::educational-background.educational-background'
    >;
    family_status: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::family-status.family-status'
    >;
    family_status_other: Attribute.String;
    firstname: Attribute.String;
    influence_alcohol: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    influence_drugs: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    lastname: Attribute.String;
    legal_status: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::legal-status.legal-status'
    >;
    profession: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::dropdown-job.dropdown-job'
    >;
    profession_details: Attribute.String;
    relationship_perpetrator: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::relationship-to-victim.relationship-to-victim'
    >;
    reports_on_violence: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    reports_on_violence_details: Attribute.String;
    survived_by: Attribute.Component<'survived-by.survived-by', true>;
    survived_by_details: Attribute.String;
    surviving_dependents: Attribute.Relation<
      'victim.victim',
      'oneToMany',
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent'
    >;
    type_of_feminicide: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::feminicide-type.feminicide-type'
    >;
    type_of_feminicide_details: Attribute.String;
    victim_address: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::dropdown-city.dropdown-city'
    >;
    victim_address_details: Attribute.String;
    workplace: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
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
