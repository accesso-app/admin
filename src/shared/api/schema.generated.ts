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
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as Strings
   * within GraphQL. UUIDs are used to assign unique identifiers to entities without requiring a central
   * allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: any;
}

export interface ApplicationCreate {
  title: Scalars['String'];
  redirectUri: Array<Scalars['String']>;
  isDev?: Maybe<Scalars['Boolean']>;
  allowedRegistrations?: Maybe<Scalars['Boolean']>;
}

export const scalarsEnumsHash: import('gqty').ScalarsEnumsHash = {
  Boolean: true,
  Float: true,
  ID: true,
  Int: true,
  String: true,
  UUID: true,
};
export const generatedSchema = {
  Application: {
    __typename: { __type: 'String!' },
    id: { __type: 'UUID!' },
    isDev: { __type: 'Boolean!' },
    redirectUri: { __type: '[String!]!' },
    title: { __type: 'String!' },
    allowedRegistrations: { __type: 'Boolean!' },
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
  mutation: {
    __typename: { __type: 'String!' },
    applicationCreate: { __type: 'ApplicationSecret!', __args: { form: 'ApplicationCreate!' } },
    applicationRegenerateSecret: {
      __type: 'ApplicationSecret',
      __args: { applicationId: 'UUID!' },
    },
  },
  query: {
    __typename: { __type: 'String!' },
    version: { __type: 'String!' },
    application: { __type: 'Application', __args: { id: 'UUID!' } },
    applications: { __type: '[Application!]!' },
  },
  subscription: {},
} as const;

export interface Application {
  __typename?: 'Application';
  id: ScalarsEnums['UUID'];
  isDev: ScalarsEnums['Boolean'];
  redirectUri: Array<ScalarsEnums['String']>;
  title: ScalarsEnums['String'];
  allowedRegistrations: ScalarsEnums['Boolean'];
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

export interface Mutation {
  __typename?: 'Mutation';
  applicationCreate: (args: { form: ApplicationCreate }) => ApplicationSecret;
  applicationRegenerateSecret: (args: {
    applicationId: Scalars['UUID'];
  }) => Maybe<ApplicationSecret>;
}

export interface Query {
  __typename?: 'Query';
  version: ScalarsEnums['String'];
  application: (args: { id: Scalars['UUID'] }) => Maybe<Application>;
  applications: Array<Application>;
}

export interface Subscription {
  __typename?: 'Subscription';
}

export interface SchemaObjectTypes {
  Application: Application;
  ApplicationSecret: ApplicationSecret;
  Mutation: Mutation;
  Query: Query;
  Subscription: Subscription;
}
export type SchemaObjectTypesNames =
  | 'Application'
  | 'ApplicationSecret'
  | 'Mutation'
  | 'Query'
  | 'Subscription';

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {}
