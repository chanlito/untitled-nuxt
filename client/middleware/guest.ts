import { CURRENT_USER } from '@/graphql/documents';
import { Query } from '@/graphql/types';

export default async function({ app, req, redirect }: NuxtContext) {
  if (process.server) {
    // if there's a user in session, redirect to home page
    if (req.session && req.session!.user) {
      return redirect('/');
    }
  }

  if (process.client) {
    try {
      // read current user from the cache
      const cache = await app.$apolloClient!.cache.readQuery<Query>({
        query: CURRENT_USER,
      });

      // if current user is in the cache, redirect to home page
      if (cache && cache.currentUser) {
        return redirect('/');
      }

      // allow
    } catch (err) {
      // `readQuery` throws, ffs!
      // allow
    }
  }
}

type NuxtContext = import('@nuxt/vue-app').Context & {
  req: import('express').Request;
};
