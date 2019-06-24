<template>
  <v-layout column align-center justify-center>
    <h1 class="title accent--text">Signing out...</h1>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { CURRENT_USER, SIGN_OUT } from '@/graphql/documents';

@Component({ layout: 'auth' })
export default class SignOut extends Vue {
  async mounted() {
    await this.$apollo.mutate({
      mutation: SIGN_OUT,
      update: (cache, result) => {
        const data = { currentUser: null };
        cache.writeQuery({ data, query: CURRENT_USER });
      },
    });
    this.$router.replace('/sign-in');
  }
}
</script>
