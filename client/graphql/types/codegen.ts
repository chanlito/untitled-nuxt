import { GraphQLResolveInfo } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type MaybePromise<T> = Promise<T> | T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AppBar = {
  __typename?: 'AppBar';
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  resetPassword?: Maybe<Scalars['Boolean']>;
  sendResetPasswordLink?: Maybe<Scalars['Boolean']>;
  signUp: User;
  signIn: User;
  signOut?: Maybe<Scalars['Boolean']>;
  setAppBarTitle: Scalars['String'];
  switchTheme: ThemeVariant;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationSendResetPasswordLinkArgs = {
  input: SendResetPasswordLinkInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSetAppBarTitleArgs = {
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  appBar: AppBar;
  theme: Theme;
};

export type ResetPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type Role = 'ADMIN' | 'USER';

export type SecurityToken = {
  __typename?: 'SecurityToken';
  id: Scalars['ID'];
  value: Scalars['String'];
  type: SecurityTokenType;
  expiredAt: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SecurityTokenType = 'EMAIL_CONFIRMATION' | 'RESET_PASSWORD';

export type SendResetPasswordLinkInput = {
  email: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  fullName: Scalars['String'];
};

export type Theme = {
  __typename?: 'Theme';
  variant: ThemeVariant;
};

export type ThemeVariant = 'DARK' | 'LIGHT';

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  emailConfirmed: Scalars['Boolean'];
  password: Scalars['String'];
  fullName: Scalars['String'];
  role: Role;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: MaybePromise<{}>;
  User: MaybePromise<User>;
  ID: MaybePromise<Scalars['ID']>;
  String: MaybePromise<Scalars['String']>;
  Boolean: MaybePromise<Scalars['Boolean']>;
  Role: Role;
  AppBar: MaybePromise<AppBar>;
  Theme: MaybePromise<Theme>;
  ThemeVariant: ThemeVariant;
  Mutation: MaybePromise<{}>;
  ResetPasswordInput: ResetPasswordInput;
  SendResetPasswordLinkInput: SendResetPasswordLinkInput;
  SignUpInput: SignUpInput;
  SignInInput: SignInInput;
  SecurityToken: MaybePromise<SecurityToken>;
  SecurityTokenType: SecurityTokenType;
};

export type AppBarResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['AppBar']
> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Mutation']
> = {
  resetPassword?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    MutationResetPasswordArgs
  >;
  sendResetPasswordLink?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    MutationSendResetPasswordLinkArgs
  >;
  signUp?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    MutationSignUpArgs
  >;
  signIn?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    MutationSignInArgs
  >;
  signOut?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  setAppBarTitle?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    MutationSetAppBarTitleArgs
  >;
  switchTheme?: Resolver<
    ResolversTypes['ThemeVariant'],
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Query']
> = {
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  appBar?: Resolver<ResolversTypes['AppBar'], ParentType, ContextType>;
  theme?: Resolver<ResolversTypes['Theme'], ParentType, ContextType>;
};

export type SecurityTokenResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['SecurityToken']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SecurityTokenType'], ParentType, ContextType>;
  expiredAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ThemeResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['Theme']
> = {
  variant?: Resolver<ResolversTypes['ThemeVariant'], ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = Context,
  ParentType = ResolversTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailConfirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AppBar?: AppBarResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SecurityToken?: SecurityTokenResolvers<ContextType>;
  Theme?: ThemeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
