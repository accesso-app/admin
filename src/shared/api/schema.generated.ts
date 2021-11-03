/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: string;
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as Strings
   * within GraphQL. UUIDs are used to assign unique identifiers to entities without requiring a central
   * allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: string;
}

export interface ApplicationCreate {
  title: Scalars['String'];
  redirectUri: Array<Scalars['String']>;
  isDev?: Maybe<Scalars['Boolean']>;
  allowedRegistrations?: Maybe<Scalars['Boolean']>;
}

export interface UserEdit {
  id: Scalars['UUID'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}

export const scalarsEnumsHash: import('gqty').ScalarsEnumsHash = {
  Boolean: true,
  DateTime: true,
  Float: true,
  ID: true,
  Int: true,
  String: true,
  UUID: true,
};
export const generatedSchema = {
  AccessToken: {
    __typename: { __type: 'String!' },
    token: { __type: 'String!' },
    scopes: { __type: '[String!]!' },
    expiresAt: { __type: 'DateTime!' },
    registrationId: { __type: 'UUID!' },
    registration: { __type: 'UserRegistration' },
  },
  Application: {
    __typename: { __type: 'String!' },
    id: { __type: 'UUID!' },
    isDev: { __type: 'Boolean!' },
    redirectUri: { __type: '[String!]!' },
    title: { __type: 'String!' },
    allowedRegistrations: { __type: 'Boolean!' },
    registrations: { __type: '[UserRegistration!]!' },
  },
  ApplicationCreate: {
    title: { __type: 'String!' },
    redirectUri: { __type: '[String!]!' },
    isDev: { __type: 'Boolean' },
    allowedRegistrations: { __type: 'Boolean' },
  },
  ApplicationSecret: {
    __typename: { __type: 'String!' },
    id: { __type: 'UUID!' },
    isDev: { __type: 'Boolean!' },
    redirectUri: { __type: '[String!]!' },
    title: { __type: 'String!' },
    allowedRegistrations: { __type: 'Boolean!' },
    secretKey: { __type: 'String!' },
  },
  RegisterRequest: {
    __typename: { __type: 'String!' },
    email: { __type: 'String!' },
    code: { __type: 'String!' },
    expiresAt: { __type: 'DateTime!' },
  },
  User: {
    __typename: { __type: 'String!' },
    id: { __type: 'UUID!' },
    email: { __type: 'String!' },
    canonicalEmail: { __type: 'String!' },
    firstName: { __type: 'String!' },
    lastName: { __type: 'String!' },
    registrations: { __type: '[UserRegistration!]!' },
    accessTokensCount: { __type: 'Int!' },
  },
  UserEdit: {
    id: { __type: 'UUID!' },
    email: { __type: 'String' },
    firstName: { __type: 'String' },
    lastName: { __type: 'String' },
  },
  UserPasswordReset: {
    __typename: { __type: 'String!' },
    password: { __type: 'String!' },
    user: { __type: 'User!' },
  },
  UserRegistration: {
    __typename: { __type: 'String!' },
    id: { __type: 'UUID!' },
    applicationId: { __type: 'UUID!' },
    createdAt: { __type: 'DateTime!' },
    userId: { __type: 'UUID!' },
    user: { __type: 'User' },
    application: { __type: 'Application' },
    accessTokens: { __type: '[AccessToken!]!' },
  },
  mutation: {
    __typename: { __type: 'String!' },
    accessTokensDeleteForUser: { __type: 'Int!', __args: { userId: 'UUID!' } },
    applicationCreate: { __type: 'ApplicationSecret!', __args: { form: 'ApplicationCreate!' } },
    applicationRegenerateSecret: {
      __type: 'ApplicationSecret',
      __args: { applicationId: 'UUID!' },
    },
    registerRequestCreate: { __type: 'RegisterRequest!', __args: { email: 'String!' } },
    registerRequestDeleteAllForEmail: { __type: 'Int!', __args: { email: 'String!' } },
    registerRequestDelete: { __type: 'RegisterRequest', __args: { code: 'String!' } },
    userEdit: { __type: 'User', __args: { user: 'UserEdit!' } },
    userPasswordReset: { __type: 'UserPasswordReset', __args: { userId: 'UUID!' } },
  },
  query: {
    __typename: { __type: 'String!' },
    version: { __type: 'String!' },
    accessTokens: { __type: '[AccessToken!]!' },
    application: { __type: 'Application', __args: { id: 'UUID!' } },
    applications: { __type: '[Application!]!' },
    registerRequests: { __type: '[RegisterRequest!]!' },
    registerRequestsByEmail: {
      __type: '[RegisterRequest!]!',
      __args: { email: 'String!', count: 'Int!' },
    },
    registerRequestsSearch: {
      __type: '[RegisterRequest!]!',
      __args: { query: 'String!', count: 'Int!' },
    },
    users: { __type: '[User!]!' },
    userByEmail: { __type: 'User', __args: { email: 'String!' } },
    userById: { __type: 'User', __args: { userId: 'UUID!' } },
    usersSearch: { __type: '[User!]!', __args: { query: 'String!' } },
  },
  subscription: {},
} as const;

export interface AccessToken {
  __typename?: 'AccessToken';
  token: ScalarsEnums['String'];
  scopes: Array<ScalarsEnums['String']>;
  expiresAt: ScalarsEnums['DateTime'];
  registrationId: ScalarsEnums['UUID'];
  registration?: Maybe<UserRegistration>;
}

export interface Application {
  __typename?: 'Application';
  id: ScalarsEnums['UUID'];
  isDev: ScalarsEnums['Boolean'];
  redirectUri: Array<ScalarsEnums['String']>;
  title: ScalarsEnums['String'];
  allowedRegistrations: ScalarsEnums['Boolean'];
  registrations: Array<UserRegistration>;
}

export interface ApplicationSecret {
  __typename?: 'ApplicationSecret';
  id: ScalarsEnums['UUID'];
  isDev: ScalarsEnums['Boolean'];
  redirectUri: Array<ScalarsEnums['String']>;
  title: ScalarsEnums['String'];
  allowedRegistrations: ScalarsEnums['Boolean'];
  /**
   * Allowed to read only after application is created
   */
  secretKey: ScalarsEnums['String'];
}

export interface RegisterRequest {
  __typename?: 'RegisterRequest';
  email: ScalarsEnums['String'];
  code: ScalarsEnums['String'];
  expiresAt: ScalarsEnums['DateTime'];
}

export interface User {
  __typename?: 'User';
  id: ScalarsEnums['UUID'];
  email: ScalarsEnums['String'];
  canonicalEmail: ScalarsEnums['String'];
  firstName: ScalarsEnums['String'];
  lastName: ScalarsEnums['String'];
  registrations: Array<UserRegistration>;
  accessTokensCount: ScalarsEnums['Int'];
}

export interface UserPasswordReset {
  __typename?: 'UserPasswordReset';
  password: ScalarsEnums['String'];
  user: User;
}

export interface UserRegistration {
  __typename?: 'UserRegistration';
  id: ScalarsEnums['UUID'];
  /**
   * Field renamed from `client_id`
   */
  applicationId: ScalarsEnums['UUID'];
  createdAt: ScalarsEnums['DateTime'];
  userId: ScalarsEnums['UUID'];
  user?: Maybe<User>;
  application?: Maybe<Application>;
  accessTokens: Array<AccessToken>;
}

export interface Mutation {
  __typename?: 'Mutation';
  accessTokensDeleteForUser: (args: { userId: Scalars['UUID'] }) => ScalarsEnums['Int'];
  applicationCreate: (args: { form: ApplicationCreate }) => ApplicationSecret;
  applicationRegenerateSecret: (args: {
    applicationId: Scalars['UUID'];
  }) => Maybe<ApplicationSecret>;
  registerRequestCreate: (args: { email: Scalars['String'] }) => RegisterRequest;
  registerRequestDeleteAllForEmail: (args: { email: Scalars['String'] }) => ScalarsEnums['Int'];
  registerRequestDelete: (args: { code: Scalars['String'] }) => Maybe<RegisterRequest>;
  userEdit: (args: { user: UserEdit }) => Maybe<User>;
  userPasswordReset: (args: { userId: Scalars['UUID'] }) => Maybe<UserPasswordReset>;
}

export interface Query {
  __typename?: 'Query';
  version: ScalarsEnums['String'];
  accessTokens: Array<AccessToken>;
  application: (args: { id: Scalars['UUID'] }) => Maybe<Application>;
  applications: Array<Application>;
  registerRequests: Array<RegisterRequest>;
  registerRequestsByEmail: (args: {
    email: Scalars['String'];
    /**
     * @defaultValue `100`
     */
    count: Scalars['Int'];
  }) => Array<RegisterRequest>;
  registerRequestsSearch: (args: {
    query: Scalars['String'];
    /**
     * @defaultValue `100`
     */
    count: Scalars['Int'];
  }) => Array<RegisterRequest>;
  users: Array<User>;
  userByEmail: (args: { email: Scalars['String'] }) => Maybe<User>;
  userById: (args: { userId: Scalars['UUID'] }) => Maybe<User>;
  usersSearch: (args: { query: Scalars['String'] }) => Array<User>;
}

export interface Subscription {
  __typename?: 'Subscription';
}

export interface SchemaObjectTypes {
  AccessToken: AccessToken;
  Application: Application;
  ApplicationSecret: ApplicationSecret;
  Mutation: Mutation;
  Query: Query;
  RegisterRequest: RegisterRequest;
  Subscription: Subscription;
  User: User;
  UserPasswordReset: UserPasswordReset;
  UserRegistration: UserRegistration;
}
export type SchemaObjectTypesNames =
  | 'AccessToken'
  | 'Application'
  | 'ApplicationSecret'
  | 'Mutation'
  | 'Query'
  | 'RegisterRequest'
  | 'Subscription'
  | 'User'
  | 'UserPasswordReset'
  | 'UserRegistration';

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {}
