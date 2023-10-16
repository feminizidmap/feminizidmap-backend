import type { Schema, Attribute } from '@strapi/strapi';

export interface AdresseAdresse extends Schema.Component {
  collectionName: 'components_adresse_adresses';
  info: {
    displayName: 'Adresse';
    icon: 'pinMap';
  };
  attributes: {
    country: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
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
    country: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
  };
}

export interface CrimeCrime extends Schema.Component {
  collectionName: 'components_crime_crimes';
  info: {
    displayName: 'Crime';
    description: '';
  };
  attributes: {
    location: Attribute.Component<'adresse.adresse'>;
    feminicide_type: Attribute.Relation<
      'crime.crime',
      'oneToOne',
      'api::feminicide-type.feminicide-type'
    >;
    media_label: Attribute.Relation<
      'crime.crime',
      'oneToMany',
      'api::media-label.media-label'
    >;
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
    citizenship_type: Attribute.Enumeration<
      [
        'Deutsche Staatsb\u00FCrgerschaft',
        'Doppelte Staatsb\u00FCrgerschaft (DE+andere)',
        'Ausl\u00E4ndische Staatsb\u00FCrgerschaft'
      ]
    >;
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
    legal_status: Attribute.Enumeration<
      [
        'Asylsuchend/gefl\u00FCchtet',
        'Aufenthaltsgenehmigung (ohne Gefl\u00FCchtete)',
        'Undokumentiert/ohne Papiere',
        'entf\u00E4llt'
      ]
    >;
    age: Attribute.Integer;
    firstname: Attribute.String;
    lastname: Attribute.String;
    home_address: Attribute.Component<'adresse.wohnort'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'adresse.adresse': AdresseAdresse;
      'adresse.wohnort': AdresseWohnort;
      'crime.crime': CrimeCrime;
      'person.person': PersonPerson;
    }
  }
}
