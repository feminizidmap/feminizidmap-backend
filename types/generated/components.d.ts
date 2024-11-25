import type { Schema, Attribute } from '@strapi/strapi';

export interface AdresseAdresse extends Schema.Component {
  collectionName: 'components_adresse_adresses';
  info: {
    displayName: 'Address';
    icon: 'pinMap';
    description: '';
  };
  attributes: {
    street: Attribute.String & Attribute.Private;
    city: Attribute.String;
    county: Attribute.String;
    dropdown_bundesland: Attribute.Relation<
      'adresse.adresse',
      'oneToOne',
      'api::federal-state.federal-state'
    >;
    country: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    coordinates: Attribute.JSON &
      Attribute.CustomField<'plugin::google-maps.location-picker'>;
  };
}

export interface CommentsComments extends Schema.Component {
  collectionName: 'components_comments_comments';
  info: {
    displayName: 'comments';
    icon: 'feather';
    description: '';
  };
  attributes: {
    comment: Attribute.String & Attribute.Private;
  };
}

export interface CrimeCrime extends Schema.Component {
  collectionName: 'components_crime_crimes';
  info: {
    displayName: 'crime';
    icon: 'collapse';
    description: '';
  };
  attributes: {
    location_of_body: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::location-of-body.location-of-body'
    >;
    location_details: Attribute.String;
    further_acts_of_violence: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::violent-act.violent-act'
    >;
    weapons: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::weapon.weapon'
    >;
    weapon_details: Attribute.String;
    motives: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::dropdown-motive.dropdown-motive'
    >;
    motive_details: Attribute.String;
    cause_of_death: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::violent-act.violent-act'
    >;
    description_of_crimescene: Attribute.Text;
    detailed_location_of_body: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::dropdown-details-of-location.dropdown-details-of-location'
    >;
    other_victims: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::dropdown-other-victim.dropdown-other-victim'
    >;
    acts_of_violence_details: Attribute.Text;
  };
}

export interface PerpretratorPerpetrator extends Schema.Component {
  collectionName: 'components_perpretrator_perpetrators';
  info: {
    displayName: 'perpetrator';
    icon: 'user';
    description: '';
  };
  attributes: {
    lastname: Attribute.String;
    firstname: Attribute.String;
    age: Attribute.Integer;
    is_suspect: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    profession_details: Attribute.String;
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
    profession: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-job.dropdown-job'
    >;
    citizenship_type: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
    legal_status: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::legal-status.legal-status'
    >;
    judical_status: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator'
    >;
    committed_suicide: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::suicide-after-crime.suicide-after-crime'
    >;
    sentence: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::criminal-act.criminal-act'
    >;
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
    mental_illness: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    address: Attribute.Component<'adresse.adresse'>;
    gender: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::gender-perpetrator.gender-perpetrator'
    >;
    cititzenship: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    drugs_details: Attribute.String;
    mental_illness_details: Attribute.String;
    sentence_details: Attribute.String;
    criminal_record: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    criminal_record_details: Attribute.Text & Attribute.Private;
    restraining_order: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    restraining_order_details: Attribute.Text & Attribute.Private;
    citizenship_details: Attribute.Text & Attribute.Private;
    family_status_other: Attribute.String;
    gender_details: Attribute.String;
    suicide_details: Attribute.String;
    judical_status_details: Attribute.String;
  };
}

export interface SourceSource extends Schema.Component {
  collectionName: 'components_source_sources';
  info: {
    displayName: 'source';
    icon: 'earth';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    source_types: Attribute.Relation<
      'source.source',
      'oneToOne',
      'api::source-type.source-type'
    >;
    source_type_details: Attribute.String;
    pdf_created: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
  };
}

export interface SurvivedBySurvivedBy extends Schema.Component {
  collectionName: 'components_survived_by_survived_bies';
  info: {
    displayName: 'survived_by';
    description: '';
  };
  attributes: {
    dropdown_hinterbliebene: Attribute.Relation<
      'survived-by.survived-by',
      'oneToOne',
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent'
    >;
    age: Attribute.Integer;
    relation_details: Attribute.String;
  };
}

export interface VictimVictim extends Schema.Component {
  collectionName: 'components_victim_victims';
  info: {
    displayName: 'Victim';
    icon: 'user';
    description: '';
  };
  attributes: {
    firstname: Attribute.String;
    lastname: Attribute.String;
    age: Attribute.Integer;
    family_status: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::family-status.family-status'
    >;
    educational_background: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::educational-background.educational-background'
    >;
    citizenship_type: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
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
    workplace: Attribute.String;
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
    drugs_details: Attribute.String;
    reports_on_violence_details: Attribute.String;
    reports_on_violence: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    survived_by_details: Attribute.String;
    address: Attribute.Component<'adresse.adresse'>;
    citizenship: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    relationship_perpetrator: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::relationship-to-victim.relationship-to-victim'
    >;
    type_of_feminicide: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::feminicide-type.feminicide-type'
    >;
    citizenship_details: Attribute.Text & Attribute.Private;
    surviving_dependents: Attribute.Relation<
      'victim.victim',
      'oneToMany',
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent'
    >;
    family_status_other: Attribute.String;
    type_of_feminicide_details: Attribute.String;
    survived_by: Attribute.Component<'survived-by.survived-by', true>;
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
