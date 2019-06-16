<template>
  <v-layout column align-center justify-center>
    <v-progress-circular class="mb-3" color="accent" indeterminate />
    <h1 class="title accent--text">Goodbye...</h1>
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/vue-app';
import { Component, Vue } from 'nuxt-property-decorator';
import { CURRENT_USER, SIGN_OUT } from '@/graphql/documents';

@Component({ layout: 'auth' })
export default class SignOut extends Vue {
  async fetch({ app, redirect }: Context) {
    await app.$apolloClient!.mutate({
      mutation: SIGN_OUT,
      update: (cache, result) => {
        const data = { currentUser: null };
        cache.writeQuery({ data, query: CURRENT_USER });
      },
    });
    redirect('/sign-in');
  }
}
</script>
