/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  allowedRegistrations?: InputMaybe<Scalars['Boolean']>;
  isDev?: InputMaybe<Scalars['Boolean']>;
  redirectUri: Array<Scalars['String']>;
  title: Scalars['String'];
}

export interface ApplicationEdit {
  allowedRegistrations?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['UUID'];
  isDev?: InputMaybe<Scalars['Boolean']>;
  redirectUri?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
}

export interface UserEdit {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  lastName?: InputMaybe<Scalars['String']>;
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
    expiresAt: { __type: 'DateTime!' },
    registration: { __type: 'UserRegistration' },
    registrationId: { __type: 'UUID!' },
    scopes: { __type: '[String!]!' },
    token: { __type: 'String!' },
  },
  Application: {
    __typename: { __type: 'String!' },
    allowedRegistrations: { __type: 'Boolean!' },
    id: { __type: 'UUID!' },
    isDev: { __type: 'Boolean!' },
    redirectUri: { __type: '[String!]!' },
    registrations: { __type: '[UserRegistration!]!' },
    title: { __type: 'String!' },
  },
  ApplicationCreate: {
    allowedRegistrations: { __type: 'Boolean' },
    isDev: { __type: 'Boolean' },
    redirectUri: { __type: '[String!]!' },
    title: { __type: 'String!' },
  },
  ApplicationEdit: {
    allowedRegistrations: { __type: 'Boolean' },
    id: { __type: 'UUID!' },
    isDev: { __type: 'Boolean' },
    redirectUri: { __type: '[String!]' },
    title: { __type: 'String' },
  },
  ApplicationSecret: {
    __typename: { __type: 'String!' },
    allowedRegistrations: { __type: 'Boolean!' },
    id: { __type: 'UUID!' },
    isDev: { __type: 'Boolean!' },
    redirectUri: { __type: '[String!]!' },
    secretKey: { __type: 'String!' },
    title: { __type: 'String!' },
  },
  RegisterRequest: {
    __typename: { __type: 'String!' },
    code: { __type: 'String!' },
    email: { __type: 'String!' },
    expiresAt: { __type: 'DateTime!' },
  },
  User: {
    __typename: { __type: 'String!' },
    accessTokensCount: { __type: 'Int!' },
    canonicalEmail: { __type: 'String!' },
    email: { __type: 'String!' },
    firstName: { __type: 'String!' },
    id: { __type: 'UUID!' },
    lastName: { __type: 'String!' },
    registrations: { __type: '[UserRegistration!]!' },
  },
  UserEdit: {
    email: { __type: 'String' },
    firstName: { __type: 'String' },
    id: { __type: 'UUID!' },
    lastName: { __type: 'String' },
  },
  UserPasswordReset: {
    __typename: { __type: 'String!' },
    password: { __type: 'String!' },
    user: { __type: 'User!' },
  },
  UserRegistration: {
    __typename: { __type: 'String!' },
    accessTokens: { __type: '[AccessToken!]!' },
    application: { __type: 'Application' },
    applicationId: { __type: 'UUID!' },
    createdAt: { __type: 'DateTime!' },
    id: { __type: 'UUID!' },
    user: { __type: 'User' },
    userId: { __type: 'UUID!' },
  },
  mutation: {
    __typename: { __type: 'String!' },
    accessTokensDeleteForUser: { __type: 'Int!', __args: { userId: 'UUID!' } },
    applicationCreate: { __type: 'ApplicationSecret!', __args: { form: 'ApplicationCreate!' } },
    applicationEdit: { __type: 'Application', __args: { form: 'ApplicationEdit!' } },
    applicationRegenerateSecret: {
      __type: 'ApplicationSecret',
      __args: { applicationId: 'UUID!' },
    },
    registerRequestCreate: { __type: 'RegisterRequest!', __args: { email: 'String!' } },
    registerRequestDelete: { __type: 'RegisterRequest', __args: { code: 'String!' } },
    registerRequestDeleteAllForEmail: { __type: 'Int!', __args: { email: 'String!' } },
    userEdit: { __type: 'User', __args: { user: 'UserEdit!' } },
    userPasswordReset: { __type: 'UserPasswordReset', __args: { userId: 'UUID!' } },
  },
  query: {
    __typename: { __type: 'String!' },
    accessTokens: { __type: '[AccessToken!]!' },
    application: { __type: 'Application', __args: { id: 'UUID!' } },
    applications: { __type: '[Application!]!' },
    registerRequests: { __type: '[RegisterRequest!]!' },
    registerRequestsByEmail: {
      __type: '[RegisterRequest!]!',
      __args: { count: 'Int!', email: 'String!' },
    },
    registerRequestsSearch: {
      __type: '[RegisterRequest!]!',
      __args: { count: 'Int!', query: 'String!' },
    },
    userByEmail: { __type: 'User', __args: { email: 'String!' } },
    userById: { __type: 'User', __args: { userId: 'UUID!' } },
    users: { __type: '[User!]!' },
    usersSearch: { __type: '[User!]!', __args: { query: 'String!' } },
    version: { __type: 'String!' },
  },
  subscription: {},
} as const;

export interface AccessToken {
  __typename?: 'AccessToken';
  expiresAt: ScalarsEnums['DateTime'];
  registration?: Maybe<UserRegistration>;
  registrationId: ScalarsEnums['UUID'];
  scopes: Array<ScalarsEnums['String']>;
  token: ScalarsEnums['String'];
}

export interface Application {
  __typename?: 'Application';
  allowedRegistrations: ScalarsEnums['Boolean'];
  id: ScalarsEnums['UUID'];
  isDev: ScalarsEnums['Boolean'];
  redirectUri: Array<ScalarsEnums['String']>;
  registrations: Array<UserRegistration>;
  title: ScalarsEnums['String'];
}

export interface ApplicationSecret {
  __typename?: 'ApplicationSecret';
  allowedRegistrations: ScalarsEnums['Boolean'];
  id: ScalarsEnums['UUID'];
  isDev: ScalarsEnums['Boolean'];
  redirectUri: Array<ScalarsEnums['String']>;
  /**
   * Allowed to read only after application is created
   */
  secretKey: ScalarsEnums['String'];
  title: ScalarsEnums['String'];
}

export interface RegisterRequest {
  __typename?: 'RegisterRequest';
  code: ScalarsEnums['String'];
  email: ScalarsEnums['String'];
  expiresAt: ScalarsEnums['DateTime'];
}

export interface User {
  __typename?: 'User';
  accessTokensCount: ScalarsEnums['Int'];
  canonicalEmail: ScalarsEnums['String'];
  email: ScalarsEnums['String'];
  firstName: ScalarsEnums['String'];
  id: ScalarsEnums['UUID'];
  lastName: ScalarsEnums['String'];
  registrations: Array<UserRegistration>;
}

export interface UserPasswordReset {
  __typename?: 'UserPasswordReset';
  password: ScalarsEnums['String'];
  user: User;
}

export interface UserRegistration {
  __typename?: 'UserRegistration';
  accessTokens: Array<AccessToken>;
  application?: Maybe<Application>;
  /**
   * Field renamed from `client_id`
   */
  applicationId: ScalarsEnums['UUID'];
  createdAt: ScalarsEnums['DateTime'];
  id: ScalarsEnums['UUID'];
  user?: Maybe<User>;
  userId: ScalarsEnums['UUID'];
}

export interface Mutation {
  __typename?: 'Mutation';
  accessTokensDeleteForUser: (args: { userId: Scalars['UUID'] }) => ScalarsEnums['Int'];
  applicationCreate: (args: { form: ApplicationCreate }) => ApplicationSecret;
  applicationEdit: (args: { form: ApplicationEdit }) => Maybe<Application>;
  applicationRegenerateSecret: (args: {
    applicationId: Scalars['UUID'];
  }) => Maybe<ApplicationSecret>;
  registerRequestCreate: (args: { email: Scalars['String'] }) => RegisterRequest;
  registerRequestDelete: (args: { code: Scalars['String'] }) => Maybe<RegisterRequest>;
  registerRequestDeleteAllForEmail: (args: { email: Scalars['String'] }) => ScalarsEnums['Int'];
  userEdit: (args: { user: UserEdit }) => Maybe<User>;
  userPasswordReset: (args: { userId: Scalars['UUID'] }) => Maybe<UserPasswordReset>;
}

export interface Query {
  __typename?: 'Query';
  accessTokens: Array<AccessToken>;
  application: (args: { id: Scalars['UUID'] }) => Maybe<Application>;
  applications: Array<Application>;
  registerRequests: Array<RegisterRequest>;
  registerRequestsByEmail: (args: {
    /**
     * @defaultValue `100`
     */
    count: Scalars['Int'];
    email: Scalars['String'];
  }) => Array<RegisterRequest>;
  registerRequestsSearch: (args: {
    /**
     * @defaultValue `100`
     */
    count: Scalars['Int'];
    query: Scalars['String'];
  }) => Array<RegisterRequest>;
  userByEmail: (args: { email: Scalars['String'] }) => Maybe<User>;
  userById: (args: { userId: Scalars['UUID'] }) => Maybe<User>;
  users: Array<User>;
  usersSearch: (args: { query: Scalars['String'] }) => Array<User>;
  version: ScalarsEnums['String'];
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
