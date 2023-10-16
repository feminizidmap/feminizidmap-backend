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

export interface AdresseCrime extends Schema.Component {
  collectionName: 'components_adresse_crimes';
  info: {
    displayName: 'crime';
  };
  attributes: {};
}

export interface AdresseWohnort extends Schema.Component {
  collectionName: 'components_adresse_wohnorts';
  info: {
    displayName: 'Wohnort';
    icon: 'pinMap';
  };
  attributes: {};
}

export interface CrimeCrimeCase extends Schema.Component {
  collectionName: 'components_crime_crime_cases';
  info: {
    displayName: 'Crime_case';
  };
  attributes: {};
}

export interface CrimeCrime extends Schema.Component {
  collectionName: 'components_crime_crimes';
  info: {
    displayName: 'Crime';
    description: '';
  };
  attributes: {
    Adresse: Attribute.Component<'adresse.crime'>;
  };
}

export interface PerpetratorPerpetratorCase extends Schema.Component {
  collectionName: 'components_perpetrator_perpetrator_cases';
  info: {
    displayName: 'Perpetrator_case';
  };
  attributes: {};
}

export interface PerpetratorPerpetrator extends Schema.Component {
  collectionName: 'components_perpetrator_perpetrators';
  info: {
    displayName: 'perpetrator';
  };
  attributes: {
    Perpetrator: Attribute.Component<'person.perpetrator'>;
  };
}

export interface PersonPerpetrator extends Schema.Component {
  collectionName: 'components_person_perpetrators';
  info: {
    displayName: 'perpetrator';
  };
  attributes: {};
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

export interface PersonVictim extends Schema.Component {
  collectionName: 'components_person_victims';
  info: {
    displayName: 'victim';
  };
  attributes: {};
}

export interface VictimVictimCase extends Schema.Component {
  collectionName: 'components_victim_victim_cases';
  info: {
    displayName: 'Victim_case';
  };
  attributes: {};
}

export interface VictimVictim extends Schema.Component {
  collectionName: 'components_victim_victims';
  info: {
    displayName: 'Victim';
    description: '';
  };
  attributes: {
    victim: Attribute.Component<'person.victim'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'adresse.adresse': AdresseAdresse;
      'adresse.crime': AdresseCrime;
      'adresse.wohnort': AdresseWohnort;
      'crime.crime-case': CrimeCrimeCase;
      'crime.crime': CrimeCrime;
      'perpetrator.perpetrator-case': PerpetratorPerpetratorCase;
      'perpetrator.perpetrator': PerpetratorPerpetrator;
      'person.perpetrator': PersonPerpetrator;
      'person.person': PersonPerson;
      'person.victim': PersonVictim;
      'victim.victim-case': VictimVictimCase;
      'victim.victim': VictimVictim;
    }
  }
}
