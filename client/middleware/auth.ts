import { CURRENT_USER } from '@/graphql/documents';
import { Query } from '@/graphql/types';

export default async function({ app, req, redirect }: NuxtContext) {
  if (process.server) {
    // if current session doesn't exist, redirect to sign in page
    if (!req.session || !req.session.user) {
      return redirect('/sign-in');
    }

    // fetch currentUser here
    // make it availabe in the cache
    try {
      await app.$apolloClient!.query({ query: CURRENT_USER });
    } catch (err) {
      return redirect('/sign-out');
    }
  }

  if (process.client) {
    try {
      // read current user from the cache
      const cache = app.$apolloClient!.cache.readQuery<Query>({
        query: CURRENT_USER,
      });

      // if current user is null, redirect to sign in page
      if (cache && !cache.currentUser) {
        return redirect('/sign-in');
      }
    } catch (err) {
      // `readQuery` throws if current user doesn't exist, redirect to sign in page
      return redirect('/sign-in');
    }
  }
}

type NuxtContext = import('@nuxt/vue-app').Context & {
  req: import('express').Request;
};
