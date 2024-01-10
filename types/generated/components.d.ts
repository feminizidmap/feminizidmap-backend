import type { Schema, Attribute } from '@strapi/strapi';

export interface AdresseAdresse extends Schema.Component {
  collectionName: 'components_adresse_adresses';
  info: {
    displayName: 'Adresse';
    icon: 'pinMap';
    description: '';
  };
  attributes: {
    street: Attribute.String;
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
      'person.person': PersonPerson;
    }
  }
}
