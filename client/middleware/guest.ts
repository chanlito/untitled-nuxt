import { CURRENT_USER } from '@/graphql/documents';
import { Query } from '@/graphql/types';
import { Context } from '@nuxt/vue-app';

export default async function({ app, req, redirect }: Context) {
  const { currentUser } = app.$apolloClient!.cache.readQuery({
    query: CURRENT_USER,
  }) as Query;
  if (currentUser) return redirect('/');
}
