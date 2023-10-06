import type { Schema, Attribute } from '@strapi/strapi';

export interface VictimVictim extends Schema.Component {
  collectionName: 'components_victim_victims';
  info: {
    displayName: 'Victim';
    description: '';
  };
  attributes: {
    first_name: Attribute.String;
    last_name: Attribute.String;
    age: Attribute.Integer;
    adresse: Attribute.String;
    victim_family_status: Attribute.Relation<
      'victim.victim',
      'oneToOne',
      'api::family-status.family-status'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'victim.victim': VictimVictim;
    }
  }
}
