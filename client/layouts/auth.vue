<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout class="auth__layout" justify-center>
          <v-flex xs12 sm9 md7 lg5>
            <v-card class="auth elevation-3">
              <v-layout class="auth__avatar" column align-center justify-center>
                <v-icon
                  class="mb-1 cursor-pointer"
                  color="accent"
                  :size="64"
                  @click="switchTheme"
                  v-text="'mdi-shield-lock'"
                />
              </v-layout>
              <nuxt />
            </v-card>
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
import { Component, mixins } from 'nuxt-property-decorator';
import { ThemeMixin } from '@/mixins';

@Component
export default class AuthLayout extends mixins(ThemeMixin) {
  year = new Date().getFullYear();
}
</script>

<style lang="sass" scoped>
.auth
  border-radius: 8px
  padding: 48px
  +screen(xs-only)
    padding: 0
  +screen(xs-only)
    border: none
    box-shadow: none !important
    &.theme--light,&.theme--dark
      background-color: transparent
  &__layout
    padding-top: 48px
  &__avatar
    padding-bottom: 24px
</style>
