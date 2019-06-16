<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout class="auth-v-layout" justify-center>
          <v-flex xs12 sm9 md7 lg5>
            <nuxt />
            <div class="mt-5 caption grey--text text-xs-center">
              {{ year }}
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AuthLayout extends Vue {
  year = new Date().getFullYear();
}
</script>

<style lang="sass" scoped>
.auth-v-layout
  padding-top: 48px
</style>
