<template>
  <v-app>
    <!-- Application Top Bar -->
    <v-app-bar app color="primary" clipped-left dark flat>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title class="title" v-text="appBar.title" />
      <v-spacer />
      <vv-app-bar-menu />
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="drawer" app clipped :mini-variant="mini">
      <vv-navigation-drawer-list :mini-variant="mini" />
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { AppBarMixin } from '@/mixins';

@Component
export default class DefaultLayout extends mixins(AppBarMixin) {
  drawer: boolean | null = null;
  mini = false;

  toggleDrawer() {
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.mini = !this.mini;
    } else {
      this.mini = false;
      this.drawer = !this.drawer;
    }
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
    +screen(md-and-down)
      padding-left: 16px !important
</style>
