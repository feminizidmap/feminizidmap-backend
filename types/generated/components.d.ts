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

export interface DrugDrug extends Schema.Component {
  collectionName: 'components_drug_drugs';
  info: {
    displayName: 'drug';
    icon: 'puzzle';
  };
  attributes: {
    label: Attribute.String;
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

export interface PersonPerson extends Schema.Component {
  collectionName: 'components_person_people';
  info: {
    displayName: 'person';
    icon: 'user';
    description: '';
  };
  attributes: {
    family_status: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::family-status.family-status'
    >;
    educational_background: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::educational-background.educational-background'
    > &
      Attribute.Private;
    age: Attribute.Integer;
    firstname: Attribute.String & Attribute.Private;
    lastname: Attribute.String & Attribute.Private;
    dropdown_staatsbuergerschaft_type: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    > &
      Attribute.Private;
    dropdown_rechtlichter_status: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::legal-status.legal-status'
    > &
      Attribute.Private;
    dropdown_staatsbuergerschafts: Attribute.Relation<
      'person.person',
      'oneToMany',
      'api::citizenship.citizenship'
    > &
      Attribute.Private;
    profession: Attribute.String;
    workplace: Attribute.String & Attribute.Private;
    address: Attribute.Component<'adresse.adresse'> & Attribute.Private;
    public_name: Attribute.String;
    dropdown_beruf: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::dropdown-job.dropdown-job'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'adresse.adresse': AdresseAdresse;
      'drug.drug': DrugDrug;
      'perpretrator.perpetrator': PerpretratorPerpetrator;
      'person.person': PersonPerson;
    }
  }
}
