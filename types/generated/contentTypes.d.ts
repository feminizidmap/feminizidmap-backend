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
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
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
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
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
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
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

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
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
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
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
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'config';
    pluralName: 'configs';
    displayName: 'Google Maps Config';
  };
  options: {
    populateCreatorFields: false;
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
    googleMapsKey: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<''>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::google-maps.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
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
    crime_date: Attribute.Date;
    notes: Attribute.Text & Attribute.Private;
    review: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    review2: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    attempt: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    authority: Attribute.String & Attribute.Private;
    perpetrator: Attribute.Component<'perpretrator.perpetrator', true>;
    victim: Attribute.Component<'victim.victim', true>;
    address: Attribute.Component<'adresse.adresse'>;
    source: Attribute.Component<'source.source', true>;
    crime: Attribute.Component<'crime.crime'>;
    media_labels: Attribute.Relation<
      'api::case.case',
      'oneToMany',
      'api::media-label.media-label'
    >;
    comments: Attribute.Component<'comments.comments', true>;
    registration_date: Attribute.Date & Attribute.Private;
    uuid: Attribute.String & Attribute.Private & Attribute.Unique;
    media_labels_details: Attribute.Text & Attribute.Private;
    report_of_crime: Attribute.Relation<
      'api::case.case',
      'oneToOne',
      'api::notification.notification'
    >;
    report_of_crime_details: Attribute.String;
    authorities_involved: Attribute.Component<'comments.comments', true>;
    media_labels_used: Attribute.Component<'comments.comments', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::case.case', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::case.case', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiCitizenshipCitizenship extends Schema.CollectionType {
  collectionName: 'citizenships';
  info: {
    singularName: 'citizenship';
    pluralName: 'citizenships';
    displayName: '[Dropdown] Ausl\u00E4ndische Staatsb\u00FCrgerschaft';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.String & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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

export interface ApiCriminalActCriminalAct extends Schema.CollectionType {
  collectionName: 'criminal_acts';
  info: {
    singularName: 'criminal-act';
    pluralName: 'criminal-acts';
    displayName: '[Dropdown] Strafsatz';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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

export interface ApiDropdownCityDropdownCity extends Schema.CollectionType {
  collectionName: 'dropdown_cities';
  info: {
    singularName: 'dropdown-city';
    pluralName: 'dropdown-cities';
    displayName: '[Dropdown] City';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    postal_code: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 5;
        maxLength: 5;
      }>;
    county: Attribute.String;
    federal_state: Attribute.String;
    city_name: Attribute.String;
    city_name_display: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-city.dropdown-city',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'dropdown-details-of-location';
    pluralName: 'dropdown-details-of-locations';
    displayName: '[Dropdown] Details zum Fundort ';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-details-of-location.dropdown-details-of-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'dropdown-general-option';
    pluralName: 'dropdown-general-options';
    displayName: '[Dropdown] General Option';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-general-option.dropdown-general-option',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'dropdown-job';
    pluralName: 'dropdown-jobs';
    displayName: '[Dropdown] Beruf';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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

export interface ApiDropdownMotiveDropdownMotive extends Schema.CollectionType {
  collectionName: 'dropdown_motives';
  info: {
    singularName: 'dropdown-motive';
    pluralName: 'dropdown-motives';
    displayName: '[Dropdown] Motives';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-motive.dropdown-motive',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'dropdown-other-victim';
    pluralName: 'dropdown-other-victims';
    displayName: '[Dropdown] Weitere Opfer';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.String & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-other-victim.dropdown-other-victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'dropdown-surviving-dependent';
    pluralName: 'dropdown-surviving-dependents';
    displayName: '[Dropdown] Hinterbliebene';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dropdown-surviving-dependent.dropdown-surviving-dependent',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'educational-background';
    pluralName: 'educational-backgrounds';
    displayName: '[Dropdown] Bildungshintergrund';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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

export interface ApiSourceTypeSourceType extends Schema.CollectionType {
  collectionName: 'source_types';
  info: {
    singularName: 'source-type';
    pluralName: 'source-types';
    displayName: '[Dropdown] Quellen Typ';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::source-type.source-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'suicide-after-crime';
    pluralName: 'suicide-after-crimes';
    displayName: '[Dropdown] Selbstmord nach Tat';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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

export interface ApiViolentActViolentAct extends Schema.CollectionType {
  collectionName: 'violent_acts';
  info: {
    singularName: 'violent-act';
    pluralName: 'violent-acts';
    displayName: '[Dropdown] Gewalthandlungen';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
    draftAndPublish: false;
  };
  attributes: {
    label: Attribute.String;
    description: Attribute.Text & Attribute.Private;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
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
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::google-maps.config': PluginGoogleMapsConfig;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::case.case': ApiCaseCase;
      'api::citizenship.citizenship': ApiCitizenshipCitizenship;
      'api::citizenship-type.citizenship-type': ApiCitizenshipTypeCitizenshipType;
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
      'api::location-of-body.location-of-body': ApiLocationOfBodyLocationOfBody;
      'api::media-label.media-label': ApiMediaLabelMediaLabel;
      'api::notification.notification': ApiNotificationNotification;
      'api::relationship-to-victim.relationship-to-victim': ApiRelationshipToVictimRelationshipToVictim;
      'api::source-type.source-type': ApiSourceTypeSourceType;
      'api::suicide-after-crime.suicide-after-crime': ApiSuicideAfterCrimeSuicideAfterCrime;
      'api::violent-act.violent-act': ApiViolentActViolentAct;
      'api::weapon.weapon': ApiWeaponWeapon;
    }
  }
}
