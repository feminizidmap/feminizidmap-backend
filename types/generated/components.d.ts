import type { Schema, Attribute } from '@strapi/strapi';

export interface AdresseAdresse extends Schema.Component {
  collectionName: 'components_adresse_adresses';
  info: {
    displayName: 'Adresse';
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
      Attribute.Required &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    profession_details: Attribute.String;
    workplace: Attribute.String;
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
    nationality_type: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
    nationality: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::citizenship.citizenship'
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
    relationship_victim: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::relationship-to-victim.relationship-to-victim'
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
    drugs_details: Attribute.String;
    mental_illness_details: Attribute.String;
    criminal_record: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    criminal_record_details: Attribute.String;
    restraining_orders: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    retraining_order_details: Attribute.String;
    suicide_details: Attribute.String;
    gender: Attribute.Relation<
      'perpretrator.perpetrator',
      'oneToOne',
      'api::gender-perpetrator.gender-perpetrator'
    >;
    sentence_details: Attribute.String;
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
    nationality_type: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
    nationality: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::citizenship.citizenship'
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
    survived_by: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::dropdown-general-option.dropdown-general-option'
    >;
    survived_by_details: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'adresse.adresse': AdresseAdresse;
      'perpretrator.perpetrator': PerpretratorPerpetrator;
      'victim.victim': VictimVictim;
    }
  }
}
