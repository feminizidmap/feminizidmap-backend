import type { Schema, Attribute } from '@strapi/strapi';

export interface AdresseAdresse extends Schema.Component {
  collectionName: 'components_adresse_adresses';
  info: {
    displayName: 'Adresse';
    icon: 'pinMap';
    description: '';
  };
  attributes: {
    city: Attribute.Relation<'adresse.adresse', 'oneToOne', 'api::city.city'>;
    street: Attribute.String;
    district: Attribute.String;
  };
}

export interface AdresseWohnort extends Schema.Component {
  collectionName: 'components_adresse_wohnorts';
  info: {
    displayName: 'Residency';
    icon: 'pinMap';
    description: '';
  };
  attributes: {
    city: Attribute.Relation<'adresse.wohnort', 'oneToOne', 'api::city.city'>;
    street: Attribute.String;
    district: Attribute.String;
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
    citizenship: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    family_status: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::family-status.family-status'
    >;
    educational_background: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::educational-background.educational-background'
    >;
    age: Attribute.Integer;
    firstname: Attribute.String;
    lastname: Attribute.String;
    home_address: Attribute.Component<'adresse.wohnort'>;
    dropdown_staatsbuergerschaft_type: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::citizenship-type.citizenship-type'
    >;
    dropdown_rechtlichter_status: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::legal-status.legal-status'
    >;
    dropdown_staatsbuergerschaft: Attribute.Relation<
      'person.person',
      'oneToOne',
      'api::citizenship.citizenship'
    >;
    profession: Attribute.String;
    workplace: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'adresse.adresse': AdresseAdresse;
      'adresse.wohnort': AdresseWohnort;
      'person.person': PersonPerson;
    }
  }
}
