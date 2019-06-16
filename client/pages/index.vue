<template>
  <div>
    <p class="body-1">This is a body content.</p>
    <v-btn color="primary">Click Here</v-btn>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/vue-app';
import { Component, Vue } from 'nuxt-property-decorator';
import { SET_APP_BAR_TITLE } from '@/graphql/documents';

@Component({ middleware: ['auth'] })
export default class Index extends Vue {
  async fetch({ app }: Context) {
    await app.$apolloClient!.mutate({
      mutation: SET_APP_BAR_TITLE,
      variables: { title: 'Home' },
    });
  }
}
</script>
