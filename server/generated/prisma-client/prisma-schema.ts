// Code generated by Prisma (prisma@1.34.0). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateSecurityToken {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createSecurityToken(data: SecurityTokenCreateInput!): SecurityToken!
  updateSecurityToken(data: SecurityTokenUpdateInput!, where: SecurityTokenWhereUniqueInput!): SecurityToken
  updateManySecurityTokens(data: SecurityTokenUpdateManyMutationInput!, where: SecurityTokenWhereInput): BatchPayload!
  upsertSecurityToken(where: SecurityTokenWhereUniqueInput!, create: SecurityTokenCreateInput!, update: SecurityTokenUpdateInput!): SecurityToken!
  deleteSecurityToken(where: SecurityTokenWhereUniqueInput!): SecurityToken
  deleteManySecurityTokens(where: SecurityTokenWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  securityToken(where: SecurityTokenWhereUniqueInput!): SecurityToken
  securityTokens(where: SecurityTokenWhereInput, orderBy: SecurityTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SecurityToken]!
  securityTokensConnection(where: SecurityTokenWhereInput, orderBy: SecurityTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SecurityTokenConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  ADMIN
  USER
}

type SecurityToken {
  id: ID!
  token: String!
  type: SecurityTokenType!
  expiredAt: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
}

type SecurityTokenConnection {
  pageInfo: PageInfo!
  edges: [SecurityTokenEdge]!
  aggregate: AggregateSecurityToken!
}

input SecurityTokenCreateInput {
  id: ID
  token: String!
  type: SecurityTokenType!
  expiredAt: DateTime!
  user: UserCreateOneWithoutSecurityTokensInput!
}

input SecurityTokenCreateManyWithoutUserInput {
  create: [SecurityTokenCreateWithoutUserInput!]
  connect: [SecurityTokenWhereUniqueInput!]
}

input SecurityTokenCreateWithoutUserInput {
  id: ID
  token: String!
  type: SecurityTokenType!
  expiredAt: DateTime!
}

type SecurityTokenEdge {
  node: SecurityToken!
  cursor: String!
}

enum SecurityTokenOrderByInput {
  id_ASC
  id_DESC
  token_ASC
  token_DESC
  type_ASC
  type_DESC
  expiredAt_ASC
  expiredAt_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SecurityTokenPreviousValues {
  id: ID!
  token: String!
  type: SecurityTokenType!
  expiredAt: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input SecurityTokenScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  type: SecurityTokenType
  type_not: SecurityTokenType
  type_in: [SecurityTokenType!]
  type_not_in: [SecurityTokenType!]
  expiredAt: DateTime
  expiredAt_not: DateTime
  expiredAt_in: [DateTime!]
  expiredAt_not_in: [DateTime!]
  expiredAt_lt: DateTime
  expiredAt_lte: DateTime
  expiredAt_gt: DateTime
  expiredAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [SecurityTokenScalarWhereInput!]
  OR: [SecurityTokenScalarWhereInput!]
  NOT: [SecurityTokenScalarWhereInput!]
}

type SecurityTokenSubscriptionPayload {
  mutation: MutationType!
  node: SecurityToken
  updatedFields: [String!]
  previousValues: SecurityTokenPreviousValues
}

input SecurityTokenSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SecurityTokenWhereInput
  AND: [SecurityTokenSubscriptionWhereInput!]
  OR: [SecurityTokenSubscriptionWhereInput!]
  NOT: [SecurityTokenSubscriptionWhereInput!]
}

enum SecurityTokenType {
  EMAIL_CONFIRMATION
  RESET_PASSWORD
}

input SecurityTokenUpdateInput {
  token: String
  type: SecurityTokenType
  expiredAt: DateTime
  user: UserUpdateOneRequiredWithoutSecurityTokensInput
}

input SecurityTokenUpdateManyDataInput {
  token: String
  type: SecurityTokenType
  expiredAt: DateTime
}

input SecurityTokenUpdateManyMutationInput {
  token: String
  type: SecurityTokenType
  expiredAt: DateTime
}

input SecurityTokenUpdateManyWithoutUserInput {
  create: [SecurityTokenCreateWithoutUserInput!]
  delete: [SecurityTokenWhereUniqueInput!]
  connect: [SecurityTokenWhereUniqueInput!]
  set: [SecurityTokenWhereUniqueInput!]
  disconnect: [SecurityTokenWhereUniqueInput!]
  update: [SecurityTokenUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [SecurityTokenUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [SecurityTokenScalarWhereInput!]
  updateMany: [SecurityTokenUpdateManyWithWhereNestedInput!]
}

input SecurityTokenUpdateManyWithWhereNestedInput {
  where: SecurityTokenScalarWhereInput!
  data: SecurityTokenUpdateManyDataInput!
}

input SecurityTokenUpdateWithoutUserDataInput {
  token: String
  type: SecurityTokenType
  expiredAt: DateTime
}

input SecurityTokenUpdateWithWhereUniqueWithoutUserInput {
  where: SecurityTokenWhereUniqueInput!
  data: SecurityTokenUpdateWithoutUserDataInput!
}

input SecurityTokenUpsertWithWhereUniqueWithoutUserInput {
  where: SecurityTokenWhereUniqueInput!
  update: SecurityTokenUpdateWithoutUserDataInput!
  create: SecurityTokenCreateWithoutUserInput!
}

input SecurityTokenWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  type: SecurityTokenType
  type_not: SecurityTokenType
  type_in: [SecurityTokenType!]
  type_not_in: [SecurityTokenType!]
  expiredAt: DateTime
  expiredAt_not: DateTime
  expiredAt_in: [DateTime!]
  expiredAt_not_in: [DateTime!]
  expiredAt_lt: DateTime
  expiredAt_lte: DateTime
  expiredAt_gt: DateTime
  expiredAt_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  user: UserWhereInput
  AND: [SecurityTokenWhereInput!]
  OR: [SecurityTokenWhereInput!]
  NOT: [SecurityTokenWhereInput!]
}

input SecurityTokenWhereUniqueInput {
  id: ID
  token: String
}

type Subscription {
  securityToken(where: SecurityTokenSubscriptionWhereInput): SecurityTokenSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  emailConfirmed: Boolean!
  fullName: String!
  role: Role!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  securityTokens(where: SecurityTokenWhereInput, orderBy: SecurityTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SecurityToken!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  email: String!
  emailConfirmed: Boolean
  fullName: String!
  role: Role!
  password: String!
  securityTokens: SecurityTokenCreateManyWithoutUserInput
}

input UserCreateOneWithoutSecurityTokensInput {
  create: UserCreateWithoutSecurityTokensInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutSecurityTokensInput {
  id: ID
  email: String!
  emailConfirmed: Boolean
  fullName: String!
  role: Role!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  emailConfirmed_ASC
  emailConfirmed_DESC
  fullName_ASC
  fullName_DESC
  role_ASC
  role_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  emailConfirmed: Boolean!
  fullName: String!
  role: Role!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  emailConfirmed: Boolean
  fullName: String
  role: Role
  password: String
  securityTokens: SecurityTokenUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  email: String
  emailConfirmed: Boolean
  fullName: String
  role: Role
  password: String
}

input UserUpdateOneRequiredWithoutSecurityTokensInput {
  create: UserCreateWithoutSecurityTokensInput
  update: UserUpdateWithoutSecurityTokensDataInput
  upsert: UserUpsertWithoutSecurityTokensInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutSecurityTokensDataInput {
  email: String
  emailConfirmed: Boolean
  fullName: String
  role: Role
  password: String
}

input UserUpsertWithoutSecurityTokensInput {
  update: UserUpdateWithoutSecurityTokensDataInput!
  create: UserCreateWithoutSecurityTokensInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  emailConfirmed: Boolean
  emailConfirmed_not: Boolean
  fullName: String
  fullName_not: String
  fullName_in: [String!]
  fullName_not_in: [String!]
  fullName_lt: String
  fullName_lte: String
  fullName_gt: String
  fullName_gte: String
  fullName_contains: String
  fullName_not_contains: String
  fullName_starts_with: String
  fullName_not_starts_with: String
  fullName_ends_with: String
  fullName_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  securityTokens_every: SecurityTokenWhereInput
  securityTokens_some: SecurityTokenWhereInput
  securityTokens_none: SecurityTokenWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`