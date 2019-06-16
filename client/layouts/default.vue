<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title class="title" v-text="appBar.title" />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-layout column fill-height>
        <v-list class="navigation-drawer__list--top" dense nav>
          <v-list-item
            v-for="({ label, icon, to }, i) in drawerMenu"
            :key="i"
            :to="to"
            color="accent"
            exact
          >
            <v-list-item-icon>
              <v-icon v-text="icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="label" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-spacer />
        <div class="navigation-drawer__list--bottom">
          <v-layout>
            <v-tooltip top>
              <template #activator="{ on }">
                <v-btn
                  style="margin-left: 12px"
                  text
                  icon
                  v-on="on"
                  @click="switchTheme"
                >
                  <v-icon
                    :color="$vuetify.theme.dark ? 'white' : 'primary'"
                    v-text="'mdi-theme-light-dark'"
                  />
                </v-btn>
              </template>
              <span>Switch Theme</span>
            </v-tooltip>
            <v-spacer />
            <v-tooltip top>
              <template #activator="{ on }">
                <v-btn
                  style="margin-right: 12px"
                  text
                  icon
                  :to="{ name: 'sign-out' }"
                  v-on="on"
                >
                  <v-icon v-text="'mdi-logout-variant'" />
                </v-btn>
              </template>
              <span>Sign Out</span>
            </v-tooltip>
          </v-layout>
        </div>
      </v-layout>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { AppBarMixin, ThemeMixin } from '@/mixins';

@Component
export default class DefaultLayout extends mixins(AppBarMixin, ThemeMixin) {
  drawer: boolean | null = null;
  drawerMenu = [
    {
      to: { name: 'index' },
      label: 'Home',
      icon: 'mdi-home-variant',
    },
  ];

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
.navigation-drawer__list
  &--top
    +screen(lg-and-up)
      margin-top: 8px
  &--bottom
    padding-bottom: 8px
</style>
