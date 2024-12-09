import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiCaseCase extends Schema.CollectionType {
  collectionName: 'cases';
  info: {
    description: '';
    displayName: 'F\u00E4lle';
    pluralName: 'cases';
    singularName: 'case';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Attribute.Component<'adresse.adresse'>;
    attempt: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    authorities_involved: Attribute.Component<'comments.comments', true>;
    authority: Attribute.String & Attribute.Private;
    comments: Attribute.Component<'comments.comments', true>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::case.case', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    crime: Attribute.Component<'crime.crime'>;
    crime_date: Attribute.Date;
    identifier: Attribute.String & Attribute.Required;
    media_labels: Attribute.Relation<
      'api::case.case',
      'oneToMany',
      'api::media-label.media-label'
    >;
    media_labels_details: Attribute.Text & Attribute.Private;
    media_labels_used: Attribute.Component<'comments.comments', true>;
    notes: Attribute.Text & Attribute.Private;
    perpetrator: Attribute.Component<'perpretrator.perpetrator', true>;
    publishedAt: Attribute.DateTime;
    registration_date: Attribute.Date & Attribute.Private;
    report_of_crime: Attribute.Relation<
      'api::case.case',
      'oneToOne',
      'api::notification.notification'
    >;
    report_of_crime_details: Attribute.String;
    review: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    review2: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    source: Attribute.Component<'source.source', true>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::case.case', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    uuid: Attribute.String & Attribute.Private & Attribute.Unique;
    victim: Attribute.Component<'victim.victim', true>;
  };
}

export interface ApiCitizenshipTypeCitizenshipType
  extends Schema.CollectionType {
  collectionName: 'citizenship_types';
  info: {
    description: '';
    displayName: '[Dropdown] Staatsb\u00FCrgerschaft Typ';
    pluralName: 'citizenship-types';
    singularName: 'citizenship-type';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::citizenship-type.citizenship-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::citizenship-type.citizenship-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCitizenshipCitizenship extends Schema.CollectionType {
  collectionName: 'citizenships';
  info: {
    description: '';
    displayName: '[Dropdown] Ausl\u00E4ndische Staatsb\u00FCrgerschaft';
    pluralName: 'citizenships';
    singularName: 'citizenship';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::citizenship.citizenship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::citizenship.citizenship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCriminalActCriminalAct extends Schema.CollectionType {
  collectionName: 'criminal_acts';
  info: {
    description: '';
    displayName: '[Dropdown] Strafsatz';
    pluralName: 'criminal-acts';
    singularName: 'criminal-act';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::criminal-act.criminal-act',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::criminal-act.criminal-act',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownCityDropdownCity extends Schema.CollectionType {
  collectionName: 'dropdown_cities';
  info: {
    description: '';
    displayName: '[Dropdown] City';
    pluralName: 'dropdown-cities';
    singularName: 'dropdown-city';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    city_name: Attribute.String;
    city_name_display: Attribute.String;
    county: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-city.dropdown-city',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    federal_state: Attribute.String;
    latitude: Attribute.String;
    longitude: Attribute.String;
    postal_code: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 5;
        minLength: 5;
      }>;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::dropdown-city.dropdown-city',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownDetailsOfLocationDropdownDetailsOfLocation
  extends Schema.CollectionType {
  collectionName: 'dropdown_details_of_locations';
  info: {
    description: '';
    displayName: '[Dropdown] Details zum Fundort ';
    pluralName: 'dropdown-details-of-locations';
    singularName: 'dropdown-details-of-location';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-details-of-location.dropdown-details-of-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::dropdown-details-of-location.dropdown-details-of-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownGeneralOptionDropdownGeneralOption
  extends Schema.CollectionType {
  collectionName: 'dropdown_general_options';
  info: {
    description: '';
    displayName: '[Dropdown] General Option';
    pluralName: 'dropdown-general-options';
    singularName: 'dropdown-general-option';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-general-option.dropdown-general-option',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::dropdown-general-option.dropdown-general-option',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownJobDropdownJob extends Schema.CollectionType {
  collectionName: 'dropdown_jobs';
  info: {
    description: '';
    displayName: '[Dropdown] Beruf';
    pluralName: 'dropdown-jobs';
    singularName: 'dropdown-job';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-job.dropdown-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::dropdown-job.dropdown-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownMotiveDropdownMotive extends Schema.CollectionType {
  collectionName: 'dropdown_motives';
  info: {
    description: '';
    displayName: '[Dropdown] Motives';
    pluralName: 'dropdown-motives';
    singularName: 'dropdown-motive';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-motive.dropdown-motive',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::dropdown-motive.dropdown-motive',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownOtherVictimDropdownOtherVictim
  extends Schema.CollectionType {
  collectionName: 'dropdown_other_victims';
  info: {
    description: '';
    displayName: '[Dropdown] Weitere Opfer';
    pluralName: 'dropdown-other-victims';
    singularName: 'dropdown-other-victim';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-other-victim.dropdown-other-victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::dropdown-other-victim.dropdown-other-victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownSurvivingDependentDropdownSurvivingDependent
  extends Schema.CollectionType {
  collectionName: 'dropdown_surviving_dependents';
  info: {
    description: '';
    displayName: '[Dropdown] Hinterbliebene';
    pluralName: 'dropdown-surviving-dependents';
    singularName: 'dropdown-surviving-dependent';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEducationalBackgroundEducationalBackground
  extends Schema.CollectionType {
  collectionName: 'educational_backgrounds';
  info: {
    description: '';
    displayName: '[Dropdown] Bildungshintergrund';
    pluralName: 'educational-backgrounds';
    singularName: 'educational-background';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::educational-background.educational-background',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::educational-background.educational-background',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFamilyStatusFamilyStatus extends Schema.CollectionType {
  collectionName: 'family_statuses';
  info: {
    description: '';
    displayName: '[Dropdown] Familienstand';
    pluralName: 'family-statuses';
    singularName: 'family-status';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::family-status.family-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::family-status.family-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFederalStateFederalState extends Schema.CollectionType {
  collectionName: 'federal_states';
  info: {
    description: '';
    displayName: '[Dropdown] Bundesland';
    pluralName: 'federal-states';
    singularName: 'federal-state';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::federal-state.federal-state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::federal-state.federal-state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFeminicideTypeFeminicideType extends Schema.CollectionType {
  collectionName: 'feminicide_types';
  info: {
    description: '';
    displayName: '[Dropdown] Feminizidart';
    pluralName: 'feminicide-types';
    singularName: 'feminicide-type';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::feminicide-type.feminicide-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::feminicide-type.feminicide-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGenderPerpetratorGenderPerpetrator
  extends Schema.CollectionType {
  collectionName: 'gender_perpetrators';
  info: {
    description: '';
    displayName: '[Dropdown] Geschlecht des T\u00E4ters/ der T\u00E4terin';
    pluralName: 'gender-perpetrators';
    singularName: 'gender-perpetrator';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gender-perpetrator.gender-perpetrator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::gender-perpetrator.gender-perpetrator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLawsuitStatusPerpetratorLawsuitStatusPerpetrator
  extends Schema.CollectionType {
  collectionName: 'lawsuit_status_perpetrators';
  info: {
    description: '';
    displayName: '[Dropdown] Verfahrensstatus des T\u00E4ters';
    pluralName: 'lawsuit-status-perpetrators';
    singularName: 'lawsuit-status-perpetrator';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLegalStatusLegalStatus extends Schema.CollectionType {
  collectionName: 'legal_statuses';
  info: {
    description: '';
    displayName: '[Dropdown] Rechtlichter Status';
    pluralName: 'legal-statuses';
    singularName: 'legal-status';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::legal-status.legal-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::legal-status.legal-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationLevel1LocationLevel1 extends Schema.CollectionType {
  collectionName: 'location_level_1s';
  info: {
    displayName: '[Dropdown] location_level_1';
    pluralName: 'location-level-1s';
    singularName: 'location-level-1';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location-level-1.location-level-1',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::location-level-1.location-level-1',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationLevel2LocationLevel2 extends Schema.CollectionType {
  collectionName: 'location_level_2s';
  info: {
    displayName: '[Dropdown] location_level_2';
    pluralName: 'location-level-2s';
    singularName: 'location-level-2';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location-level-2.location-level-2',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::location-level-2.location-level-2',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationLevel3LocationLevel3 extends Schema.CollectionType {
  collectionName: 'location_level_3s';
  info: {
    displayName: '[Dropdown] location_level_3';
    pluralName: 'location-level-3s';
    singularName: 'location-level-3';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location-level-3.location-level-3',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::location-level-3.location-level-3',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationOfBodyLocationOfBody extends Schema.CollectionType {
  collectionName: 'location_of_bodies';
  info: {
    description: '';
    displayName: '[Dropdown] Fundort des K\u00F6rpers';
    pluralName: 'location-of-bodies';
    singularName: 'location-of-body';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location-of-body.location-of-body',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::location-of-body.location-of-body',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMediaLabelMediaLabel extends Schema.CollectionType {
  collectionName: 'media_labels';
  info: {
    description: '';
    displayName: '[Dropdown] Mediale Bezeichnung';
    pluralName: 'media-labels';
    singularName: 'media-label';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::media-label.media-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::media-label.media-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNotificationNotification extends Schema.CollectionType {
  collectionName: 'notifications';
  info: {
    description: '';
    displayName: '[Dropdown] Benachrichtigung \u00FCber die Tat';
    pluralName: 'notifications';
    singularName: 'notification';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRelationshipToVictimRelationshipToVictim
  extends Schema.CollectionType {
  collectionName: 'relationships_to_victim';
  info: {
    description: '';
    displayName: '[Dropdown] Beziehung zum Opfer';
    pluralName: 'relationships-to-victim';
    singularName: 'relationship-to-victim';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::relationship-to-victim.relationship-to-victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::relationship-to-victim.relationship-to-victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSourceTypeSourceType extends Schema.CollectionType {
  collectionName: 'source_types';
  info: {
    description: '';
    displayName: '[Dropdown] Quellen Typ';
    pluralName: 'source-types';
    singularName: 'source-type';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::source-type.source-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::source-type.source-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSuicideAfterCrimeSuicideAfterCrime
  extends Schema.CollectionType {
  collectionName: 'suicide_after_crimes';
  info: {
    description: '';
    displayName: '[Dropdown] Selbstmord nach Tat';
    pluralName: 'suicide-after-crimes';
    singularName: 'suicide-after-crime';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::suicide-after-crime.suicide-after-crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::suicide-after-crime.suicide-after-crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiViolentActViolentAct extends Schema.CollectionType {
  collectionName: 'violent_acts';
  info: {
    description: '';
    displayName: '[Dropdown] Gewalthandlungen';
    pluralName: 'violent-acts';
    singularName: 'violent-act';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::violent-act.violent-act',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::violent-act.violent-act',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWeaponWeapon extends Schema.CollectionType {
  collectionName: 'weapons';
  info: {
    description: '';
    displayName: '[Dropdown] Waffen';
    pluralName: 'weapons';
    singularName: 'weapon';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::weapon.weapon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text & Attribute.Private;
    label: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::weapon.weapon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginGoogleMapsConfig extends Schema.SingleType {
  collectionName: 'google_maps_configs';
  info: {
    displayName: 'Google Maps Config';
    pluralName: 'configs';
    singularName: 'config';
  };
  options: {
    draftAndPublish: false;
    populateCreatorFields: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::google-maps.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    googleMapsKey: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<''>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::google-maps.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::case.case': ApiCaseCase;
      'api::citizenship-type.citizenship-type': ApiCitizenshipTypeCitizenshipType;
      'api::citizenship.citizenship': ApiCitizenshipCitizenship;
      'api::criminal-act.criminal-act': ApiCriminalActCriminalAct;
      'api::dropdown-city.dropdown-city': ApiDropdownCityDropdownCity;
      'api::dropdown-details-of-location.dropdown-details-of-location': ApiDropdownDetailsOfLocationDropdownDetailsOfLocation;
      'api::dropdown-general-option.dropdown-general-option': ApiDropdownGeneralOptionDropdownGeneralOption;
      'api::dropdown-job.dropdown-job': ApiDropdownJobDropdownJob;
      'api::dropdown-motive.dropdown-motive': ApiDropdownMotiveDropdownMotive;
      'api::dropdown-other-victim.dropdown-other-victim': ApiDropdownOtherVictimDropdownOtherVictim;
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent': ApiDropdownSurvivingDependentDropdownSurvivingDependent;
      'api::educational-background.educational-background': ApiEducationalBackgroundEducationalBackground;
      'api::family-status.family-status': ApiFamilyStatusFamilyStatus;
      'api::federal-state.federal-state': ApiFederalStateFederalState;
      'api::feminicide-type.feminicide-type': ApiFeminicideTypeFeminicideType;
      'api::gender-perpetrator.gender-perpetrator': ApiGenderPerpetratorGenderPerpetrator;
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator': ApiLawsuitStatusPerpetratorLawsuitStatusPerpetrator;
      'api::legal-status.legal-status': ApiLegalStatusLegalStatus;
      'api::location-level-1.location-level-1': ApiLocationLevel1LocationLevel1;
      'api::location-level-2.location-level-2': ApiLocationLevel2LocationLevel2;
      'api::location-level-3.location-level-3': ApiLocationLevel3LocationLevel3;
      'api::location-of-body.location-of-body': ApiLocationOfBodyLocationOfBody;
      'api::media-label.media-label': ApiMediaLabelMediaLabel;
      'api::notification.notification': ApiNotificationNotification;
      'api::relationship-to-victim.relationship-to-victim': ApiRelationshipToVictimRelationshipToVictim;
      'api::source-type.source-type': ApiSourceTypeSourceType;
      'api::suicide-after-crime.suicide-after-crime': ApiSuicideAfterCrimeSuicideAfterCrime;
      'api::violent-act.violent-act': ApiViolentActViolentAct;
      'api::weapon.weapon': ApiWeaponWeapon;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::google-maps.config': PluginGoogleMapsConfig;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
