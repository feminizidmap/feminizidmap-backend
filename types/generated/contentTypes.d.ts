import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
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
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
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
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
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
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
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
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
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
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
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
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
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
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
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
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAlcoholInfluenceDuringCrimeAlcoholInfluenceDuringCrime
  extends Schema.CollectionType {
  collectionName: 'alcohol_influence_during_crimes';
  info: {
    singularName: 'alcohol-influence-during-crime';
    pluralName: 'alcohol-influence-during-crimes';
    displayName: '[Dropdown] Alkoholisiert w\u00E4hrend der Tat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::alcohol-influence-during-crime.alcohol-influence-during-crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::alcohol-influence-during-crime.alcohol-influence-during-crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCaseCase extends Schema.CollectionType {
  collectionName: 'cases';
  info: {
    singularName: 'case';
    pluralName: 'cases';
    displayName: 'F\u00E4lle';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    identifier: Attribute.String & Attribute.Required;
    crime_date: Attribute.Date & Attribute.Required;
    sources: Attribute.Relation<
      'api::case.case',
      'oneToMany',
      'api::source.source'
    >;
    summary: Attribute.Text & Attribute.Private;
    notes: Attribute.Text & Attribute.Private;
    opfers: Attribute.Relation<
      'api::case.case',
      'oneToMany',
      'api::victim.victim'
    >;
    taeters: Attribute.Relation<
      'api::case.case',
      'oneToMany',
      'api::perpetrator.perpetrator'
    >;
    crime: Attribute.Relation<'api::case.case', 'oneToOne', 'api::crime.crime'>;
    review2: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    review3: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    attempt: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    authority: Attribute.String & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::case.case', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::case.case', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCauseOfDeathCauseOfDeath extends Schema.CollectionType {
  collectionName: 'cause_of_deaths';
  info: {
    singularName: 'cause-of-death';
    pluralName: 'cause-of-deaths';
    displayName: '[Dropdown]  Gewalthandlung die zum Tod f\u00FChrte';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cause-of-death.cause-of-death',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cause-of-death.cause-of-death',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCitizenshipCitizenship extends Schema.CollectionType {
  collectionName: 'citizenships';
  info: {
    singularName: 'citizenship';
    pluralName: 'citizenships';
    displayName: '[Dropdown] Staatsb\u00FCrgerschaft';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    country: Attribute.String &
      Attribute.CustomField<'plugin::country-select.country'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::citizenship.citizenship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::citizenship.citizenship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCitizenshipTypeCitizenshipType
  extends Schema.CollectionType {
  collectionName: 'citizenship_types';
  info: {
    singularName: 'citizenship-type';
    pluralName: 'citizenship-types';
    displayName: '[Dropdown] Staatsb\u00FCrgerschaft Typ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.String & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::citizenship-type.citizenship-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::citizenship-type.citizenship-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCrimeCrime extends Schema.CollectionType {
  collectionName: 'crimes';
  info: {
    singularName: 'crime';
    pluralName: 'crimes';
    displayName: 'Tat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Attribute.Component<'adresse.adresse'>;
    dropdown_fundort_des_koerper: Attribute.Relation<
      'api::crime.crime',
      'oneToOne',
      'api::location-of-body.location-of-body'
    >;
    details_of_location: Attribute.String;
    dropdown_gewalthandlung_die_zum_tod_fuehrte: Attribute.Relation<
      'api::crime.crime',
      'oneToOne',
      'api::cause-of-death.cause-of-death'
    >;
    dropdown_weitere_gewalthandlungen: Attribute.Relation<
      'api::crime.crime',
      'oneToOne',
      'api::violent-act.violent-act'
    >;
    dropdown_waffen: Attribute.Relation<
      'api::crime.crime',
      'oneToOne',
      'api::weapon.weapon'
    >;
    details_on_weapons: Attribute.String;
    dropdown_feminizidart: Attribute.Relation<
      'api::crime.crime',
      'oneToOne',
      'api::feminicide-type.feminicide-type'
    >;
    further_victims: Attribute.String;
    motiv: Attribute.String;
    faelle: Attribute.Relation<
      'api::crime.crime',
      'oneToOne',
      'api::case.case'
    >;
    dropdown_mediale_bezeichnungs: Attribute.Relation<
      'api::crime.crime',
      'oneToMany',
      'api::media-label.media-label'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::crime.crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::crime.crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCriminalActCriminalAct extends Schema.CollectionType {
  collectionName: 'criminal_acts';
  info: {
    singularName: 'criminal-act';
    pluralName: 'criminal-acts';
    displayName: '[Dropdown] Strafsatz';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::criminal-act.criminal-act',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::criminal-act.criminal-act',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownHinterbliebenePrivatDropdownHinterbliebenePrivat
  extends Schema.CollectionType {
  collectionName: 'dropdown_hinterbliebene_privats';
  info: {
    singularName: 'dropdown-hinterbliebene-privat';
    pluralName: 'dropdown-hinterbliebene-privats';
    displayName: '[Dropdown] Hinterbliebene (privat)';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-hinterbliebene-privat.dropdown-hinterbliebene-privat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dropdown-hinterbliebene-privat.dropdown-hinterbliebene-privat',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownJobDropdownJob extends Schema.CollectionType {
  collectionName: 'dropdown_jobs';
  info: {
    singularName: 'dropdown-job';
    pluralName: 'dropdown-jobs';
    displayName: '[Dropdown] Beruf';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-job.dropdown-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dropdown-job.dropdown-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownReportOnViolenceDropdownReportOnViolence
  extends Schema.CollectionType {
  collectionName: 'dropdown_reports_on_violence';
  info: {
    singularName: 'dropdown-report-on-violence';
    pluralName: 'dropdown-reports-on-violence';
    displayName: '[Dropdown] Berichte \u00FCber Gewalt';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-report-on-violence.dropdown-report-on-violence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dropdown-report-on-violence.dropdown-report-on-violence',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDropdownSurvivedByPublicDropdownSurvivedByPublic
  extends Schema.CollectionType {
  collectionName: 'dropdown_survived_by_publics';
  info: {
    singularName: 'dropdown-survived-by-public';
    pluralName: 'dropdown-survived-by-publics';
    displayName: '[Dropdown] Hinterbliebene (public)';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-survived-by-public.dropdown-survived-by-public',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dropdown-survived-by-public.dropdown-survived-by-public',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDrugInfluenceDuringCrimeDrugInfluenceDuringCrime
  extends Schema.CollectionType {
  collectionName: 'drug_influence_during_crimes';
  info: {
    singularName: 'drug-influence-during-crime';
    pluralName: 'drug-influence-during-crimes';
    displayName: '[Dropdown] Drogeneinfluss w\u00E4hrend der Tat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::drug-influence-during-crime.drug-influence-during-crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::drug-influence-during-crime.drug-influence-during-crime',
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
    singularName: 'educational-background';
    pluralName: 'educational-backgrounds';
    displayName: '[Dropdown] Bildungshintergrund';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::educational-background.educational-background',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'family-status';
    pluralName: 'family-statuses';
    displayName: '[Dropdown] Familienstand';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::family-status.family-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'federal-state';
    pluralName: 'federal-states';
    displayName: '[Dropdown] Bundesland';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::federal-state.federal-state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'feminicide-type';
    pluralName: 'feminicide-types';
    displayName: '[Dropdown] Feminizidart';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::feminicide-type.feminicide-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'gender-perpetrator';
    pluralName: 'gender-perpetrators';
    displayName: '[Dropdown] Geschlecht des T\u00E4ters/ der T\u00E4terin';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gender-perpetrator.gender-perpetrator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'lawsuit-status-perpetrator';
    pluralName: 'lawsuit-status-perpetrators';
    displayName: '[Dropdown] Verfahrensstatus des T\u00E4ters';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'legal-status';
    pluralName: 'legal-statuses';
    displayName: '[Dropdown] Rechtlichter Status';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::legal-status.legal-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::legal-status.legal-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocationOfBodyLocationOfBody extends Schema.CollectionType {
  collectionName: 'location_of_bodies';
  info: {
    singularName: 'location-of-body';
    pluralName: 'location-of-bodies';
    displayName: '[Dropdown] Fundort des K\u00F6rpers';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::location-of-body.location-of-body',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'media-label';
    pluralName: 'media-labels';
    displayName: '[Dropdown] Mediale Bezeichnung';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::media-label.media-label',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'notification';
    pluralName: 'notifications';
    displayName: '[Dropdown] Benachrichtigung \u00FCber die Tat';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPerpetratorPerpetrator extends Schema.CollectionType {
  collectionName: 'perpetrators';
  info: {
    singularName: 'perpetrator';
    pluralName: 'perpetrators';
    displayName: 'T\u00E4ter';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    person: Attribute.Component<'person.person'>;
    dropdown_geschlecht_des_taeters_der_taeterin: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::gender-perpetrator.gender-perpetrator'
    >;
    dropdown_moeglicher_verdaechtiger: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::possible-suspect.possible-suspect'
    >;
    dropdown_alkoholisiert_waehrend_der_tat: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::alcohol-influence-during-crime.alcohol-influence-during-crime'
    > &
      Attribute.Private;
    dropdown_drogeneinfluss_waehrend_der_tat: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::drug-influence-during-crime.drug-influence-during-crime'
    >;
    type_of_drug: Attribute.String;
    dropdown_psychische_vorerkrankungen: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::previous-mental-illness.previous-mental-illness'
    >;
    type_of_mental_illness: Attribute.String;
    criminal_record: Attribute.String;
    restraining_orders: Attribute.String;
    dropdown_verfahrensstatus_des_taeter: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator'
    >;
    dropdown_strafsatz: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::criminal-act.criminal-act'
    >;
    details_on_criminal_act: Attribute.String;
    dropdown_selbstmord_nach_tat: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::suicide-after-crime.suicide-after-crime'
    >;
    dropdown_beziehung_zum_opfer: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'api::relationship-to-victim.relationship-to-victim'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::perpetrator.perpetrator',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPossibleSuspectPossibleSuspect
  extends Schema.CollectionType {
  collectionName: 'possible_suspects';
  info: {
    singularName: 'possible-suspect';
    pluralName: 'possible-suspects';
    displayName: '[Dropdown] M\u00F6glicher Verd\u00E4chtiger';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::possible-suspect.possible-suspect',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::possible-suspect.possible-suspect',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPreviousMentalIllnessPreviousMentalIllness
  extends Schema.CollectionType {
  collectionName: 'previous_mental_illnesses';
  info: {
    singularName: 'previous-mental-illness';
    pluralName: 'previous-mental-illnesses';
    displayName: '[Dropdown] Psychische Vorerkrankungen';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::previous-mental-illness.previous-mental-illness',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::previous-mental-illness.previous-mental-illness',
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
    singularName: 'relationship-to-victim';
    pluralName: 'relationships-to-victim';
    displayName: '[Dropdown] Beziehung zum Opfer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::relationship-to-victim.relationship-to-victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::relationship-to-victim.relationship-to-victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestrainingOrderRestrainingOrder
  extends Schema.CollectionType {
  collectionName: 'restraining_orders';
  info: {
    singularName: 'restraining-order';
    pluralName: 'restraining-orders';
    displayName: '[Dropdown] Kontaktverbote';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restraining-order.restraining-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restraining-order.restraining-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSourceSource extends Schema.CollectionType {
  collectionName: 'sources';
  info: {
    singularName: 'source';
    pluralName: 'sources';
    displayName: 'Quelle';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    last_retrieved: Attribute.Date & Attribute.Required & Attribute.Private;
    url_to_pdf: Attribute.String & Attribute.Required & Attribute.Private;
    label: Attribute.String;
    faelle: Attribute.Relation<
      'api::source.source',
      'manyToOne',
      'api::case.case'
    >;
    url: Attribute.String & Attribute.Required & Attribute.Private;
    source_type: Attribute.Enumeration<
      [
        'Medien',
        'Rechtsf\u00E4lle',
        'Polizeiberichte',
        'Zivilgesellschaftliche Berichte',
        'Einzelpersonen',
        'Sonstiges (bitte angeben)'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::source.source',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::source.source',
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
    singularName: 'suicide-after-crime';
    pluralName: 'suicide-after-crimes';
    displayName: '[Dropdown] Selbstmord nach Tat';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::suicide-after-crime.suicide-after-crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::suicide-after-crime.suicide-after-crime',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVictimVictim extends Schema.CollectionType {
  collectionName: 'victims';
  info: {
    singularName: 'victim';
    pluralName: 'victims';
    displayName: 'Opfer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    person: Attribute.Component<'person.person'>;
    dropdown_alkoholisiert_waehrend_der_tat: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'api::alcohol-influence-during-crime.alcohol-influence-during-crime'
    > &
      Attribute.Private;
    dropdown_drogeneinfluss_waehrend_der_tat: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'api::drug-influence-during-crime.drug-influence-during-crime'
    >;
    type_of_drug: Attribute.String;
    history_of_violence: Attribute.String & Attribute.Private;
    dropdown_berichte_ueber_gewalt: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'api::dropdown-report-on-violence.dropdown-report-on-violence'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiViolentActViolentAct extends Schema.CollectionType {
  collectionName: 'violent_acts';
  info: {
    singularName: 'violent-act';
    pluralName: 'violent-acts';
    displayName: '[Dropdown] Weitere Gewalthandlungen';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::violent-act.violent-act',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'weapon';
    pluralName: 'weapons';
    displayName: '[Dropdown] Waffen';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::weapon.weapon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::weapon.weapon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::alcohol-influence-during-crime.alcohol-influence-during-crime': ApiAlcoholInfluenceDuringCrimeAlcoholInfluenceDuringCrime;
      'api::case.case': ApiCaseCase;
      'api::cause-of-death.cause-of-death': ApiCauseOfDeathCauseOfDeath;
      'api::citizenship.citizenship': ApiCitizenshipCitizenship;
      'api::citizenship-type.citizenship-type': ApiCitizenshipTypeCitizenshipType;
      'api::crime.crime': ApiCrimeCrime;
      'api::criminal-act.criminal-act': ApiCriminalActCriminalAct;
      'api::dropdown-hinterbliebene-privat.dropdown-hinterbliebene-privat': ApiDropdownHinterbliebenePrivatDropdownHinterbliebenePrivat;
      'api::dropdown-job.dropdown-job': ApiDropdownJobDropdownJob;
      'api::dropdown-report-on-violence.dropdown-report-on-violence': ApiDropdownReportOnViolenceDropdownReportOnViolence;
      'api::dropdown-survived-by-public.dropdown-survived-by-public': ApiDropdownSurvivedByPublicDropdownSurvivedByPublic;
      'api::drug-influence-during-crime.drug-influence-during-crime': ApiDrugInfluenceDuringCrimeDrugInfluenceDuringCrime;
      'api::educational-background.educational-background': ApiEducationalBackgroundEducationalBackground;
      'api::family-status.family-status': ApiFamilyStatusFamilyStatus;
      'api::federal-state.federal-state': ApiFederalStateFederalState;
      'api::feminicide-type.feminicide-type': ApiFeminicideTypeFeminicideType;
      'api::gender-perpetrator.gender-perpetrator': ApiGenderPerpetratorGenderPerpetrator;
      'api::lawsuit-status-perpetrator.lawsuit-status-perpetrator': ApiLawsuitStatusPerpetratorLawsuitStatusPerpetrator;
      'api::legal-status.legal-status': ApiLegalStatusLegalStatus;
      'api::location-of-body.location-of-body': ApiLocationOfBodyLocationOfBody;
      'api::media-label.media-label': ApiMediaLabelMediaLabel;
      'api::notification.notification': ApiNotificationNotification;
      'api::perpetrator.perpetrator': ApiPerpetratorPerpetrator;
      'api::possible-suspect.possible-suspect': ApiPossibleSuspectPossibleSuspect;
      'api::previous-mental-illness.previous-mental-illness': ApiPreviousMentalIllnessPreviousMentalIllness;
      'api::relationship-to-victim.relationship-to-victim': ApiRelationshipToVictimRelationshipToVictim;
      'api::restraining-order.restraining-order': ApiRestrainingOrderRestrainingOrder;
      'api::source.source': ApiSourceSource;
      'api::suicide-after-crime.suicide-after-crime': ApiSuicideAfterCrimeSuicideAfterCrime;
      'api::victim.victim': ApiVictimVictim;
      'api::violent-act.violent-act': ApiViolentActViolentAct;
      'api::weapon.weapon': ApiWeaponWeapon;
    }
  }
}
