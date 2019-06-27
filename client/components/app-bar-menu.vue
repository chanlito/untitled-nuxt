<template>
  <v-menu bottom>
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar :size="32">
          <v-img
            lazy-src="https://i.pravatar.cc/64"
            src="https://i.pravatar.cc/512"
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-card :width="300">
      <v-layout class="pa-3">
        <v-flex align-self-center shrink>
          <v-avatar :size="96">
            <v-img
              lazy-src="https://i.pravatar.cc/64"
              src="https://i.pravatar.cc/512"
            />
          </v-avatar>
        </v-flex>
        <v-flex class="pl-3">
          <v-layout column fill-height style="max-width: 156px">
            <div class="subtitle-1 text-truncate pb-2">
              <nuxt-link
                class="accent--text account-link"
                :to="{ name: 'account' }"
              >
                {{ currentUser.fullName }}
              </nuxt-link>
            </div>
            <div class="caption accent--text">
              {{ currentUser.email }}
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider />
      <v-card-actions class="px-3">
        <v-btn text icon @click="switchTheme">
          <v-icon color="accent" v-text="'mdi-theme-light-dark'" />
        </v-btn>
        <v-spacer />
        <v-btn color="error" text :to="{ name: 'sign-out' }">
          <v-icon v-text="'mdi-logout-variant'" />
          <span class="pl-2">Sign Out</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { CurrentUserMixin, ThemeMixin } from '@/mixins';

@Component
export default class AppBarMenu extends mixins(CurrentUserMixin, ThemeMixin) {}
</script>

<style lang="sass" scoped>
.account-link
  font-weight: 700
  text-decoration: none
</style>
