<template>
  <v-app>
    <!-- Application Top Bar -->
    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon class="hidden-lg-and-up" @click="toggleDrawer" />
      <v-toolbar-title class="title" v-text="appBar.title" />
      <v-spacer />
      <vv-app-bar-menu />
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex xs12 sm12 md8 lg8 xl8 offset-md2 offset-lg2 offset-xl2>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="drawer" app clipped :width="280">
      <vv-navigation-drawer-list />
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { AppBarMixin } from '@/mixins';

@Component
export default class DefaultLayout extends mixins(AppBarMixin) {
  drawer: boolean | null = null;

  toggleDrawer() {
    this.drawer = !this.drawer;
  }
}
</script>

<style lang="sass">
.v-toolbar__content
  +screen(md-and-up)
    padding: 0 24px
</style>

<style lang="sass" scoped>
.v-toolbar__title
  &.title
    +screen(lg-and-up)
      padding-left: 0 !important
</style>
