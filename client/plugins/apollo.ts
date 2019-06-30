import { initializeData } from '@/graphql/data';
import { Query } from '@/graphql/types';
import { Context } from '@nuxt/vue-app';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueApolloSSR from 'vue-apollo/ssr';

Vue.use(VueApollo);

export default function(
  {
    app,
    beforeNuxtRender,
    env,
    req, // TODO: find out how to tie this `req` type to express & session
  }: Context & { req: any },
  inject: Function,
) {
  const cache = new InMemoryCache();

  const httpLinkOptions: HttpLink.Options = {
    uri: `http://localhost:${env.PORT}/graphql`,
    credentials: 'include',
  };

  if (process.server) {
    httpLinkOptions.headers = req.headers;
  }

  const httpLink = new HttpLink(httpLinkOptions);

  const link = from([httpLink]);

  const apolloClient = new ApolloClient({
    cache,
    link,
    connectToDevTools: process.client,
    ssrMode: true,
  });

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler(error: any) {
      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: red; color: white; padding: 2px; border-radius: 4px; font-weight: bold;',
        error.message,
      );
      const { graphQLErrors, networkError } = error;

      if (graphQLErrors) {
        // TODO: handle GraphQL errors
      }

      if (networkError) {
        // TODO: handle Network errors
      }
    },
  });

  if (process.server) {
    const data = initializeData({ req });
    apolloClient.writeData({ data: { ...data } });
    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.apollo = VueApolloSSR.getStates(apolloProvider);
    });
  }

  if (process.client) {
    const state = (window as any).__NUXT__;
    if (state) {
      cache.restore(state.apollo.defaultClient);
    }
  }

  /**
   * Expose Apollo client via `app.$apolloClient` & `this.$apolloClient`
   */
  inject('apolloClient', apolloClient);

  app.apolloProvider = apolloProvider;
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $apolloClient?: ApolloClient<Partial<Query>>;
  }
}
