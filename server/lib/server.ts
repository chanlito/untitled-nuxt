import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { resolve } from 'path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import { AuthResolver, AuthService } from '../api/auth';
import { UIResolver } from '../api/ui';
import { UserResolver } from '../api/user';
import { app } from './app';
import { configureContainer } from './container';
import { context } from './context';
import { configureEnums } from './enums';
import { formatError } from './format-error';
import { nuxt } from './nuxt';
import { subscriptions } from './subscriptions';

configureContainer();
configureEnums();

export async function createGraphQLServer() {
  /**
   * Use `buildSchema` to create an executable schema from type and resolver definitions.
   * Then pass the schema to a GraphQL server (e.g. Apollo Server).
   */
  const schema = await buildSchema({
    container: Container,
    authChecker: Container.get(AuthService).authChecker,
    resolvers: [AuthResolver, UIResolver, UserResolver],
    emitSchemaFile: resolve('.', 'server/generated/schema.graphql'),
  });

  const apollo = new ApolloServer({
    /**
     * An executable GraphQL schema that will override the typeDefs and resolvers provided.
     */
    schema,

    /**
     * `context` property is an object or function called with the current request
     * that creates the context shared across all resolvers
     */
    context,

    /**
     * String defining the path for subscriptions or an Object to customize the subscriptions server.
     */
    subscriptions,

    /**
     * Functions to format the errors and response returned from the server
     */
    formatError,

    /**
     * Enables and disables development mode helpers.
     */
    debug: process.env.NODE_ENV === 'development',

    /**
     * Enables and disables playground and allows configuration of GraphQL Playground.
     */
    playground: process.env.NODE_ENV === 'development',

    /**
     * Enables and disables schema introspection.
     */
    introspection: true,
  });

  apollo.applyMiddleware({ app });

  /**
   * Let Nuxt.js handle the rendering.
   */
  app.use(nuxt.render);

  const server = createServer(app);

  apollo.installSubscriptionHandlers(server);

  return { apollo, server };
}
