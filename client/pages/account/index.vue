<template>
  <div class="account-container">
    <header>
      <v-layout class="mb-2" justify-center>
        <h1 class="headline">Personal Info</h1>
      </v-layout>
      <v-layout justify-center>
        <h2 class="subtitle-1">
          Basic info, like your name and photo, that you use on Untitled.
        </h2>
      </v-layout>
    </header>

    <section class="my-4">
      <v-card outlined flat>
        <v-card-title>
          <v-flex xs12 class="title">Profile</v-flex>
          <div class="body-2">
            Some info may be visible to other people using Untitled.
          </div>
        </v-card-title>
        <v-list two-line>
          <!-- Photo -->
          <v-list-item to="#" style="height: 92px">
            <v-list-item-avatar>
              <v-icon v-text="'mdi-camera-outline'" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                A photo helps personalize your account.
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar style="margin-right: 16px">
              <v-avatar :size="64">
                <v-img
                  lazy-src="https://i.pravatar.cc/64"
                  src="https://i.pravatar.cc/512"
                />
              </v-avatar>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider inset />

          <!-- Full Name -->
          <v-list-item nuxt :to="{ name: 'account-change-name' }">
            <v-list-item-avatar>
              <v-icon v-text="'mdi-account-circle-outline'" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ currentUser.fullName }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon v-text="'mdi-chevron-right'" />
            </v-list-item-action>
          </v-list-item>

          <v-divider inset />

          <!-- Birthday -->
          <v-list-item to="#">
            <v-list-item-avatar>
              <v-icon v-text="'mdi-calendar-outline'" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                April, 22 1992
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon v-text="'mdi-chevron-right'" />
            </v-list-item-action>
          </v-list-item>

          <v-divider inset />

          <!-- Gender -->
          <v-list-item :to="{ name: 'account-change-gender' }">
            <v-list-item-avatar>
              <v-icon v-text="'mdi-gender-male-female'" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ currentUser.gender ? currentUser.gender : 'Rather not say' }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon v-text="'mdi-chevron-right'" />
            </v-list-item-action>
          </v-list-item>

          <v-divider inset />

          <!-- Password -->
          <v-list-item :to="{ name: 'account-change-password' }">
            <v-list-item-avatar>
              <v-icon v-text="'mdi-lock-outline'" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                **********
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="currentUser.passwordLastChanged"
                class="caption"
              >
                {{ currentUser.passwordLastChanged }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon v-text="'mdi-chevron-right'" />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </section>

    <section class="my-4">
      <v-card outlined flat>
        <v-card-title>
          <v-flex xs12 class="title">Contact Info</v-flex>
        </v-card-title>
        <v-list two-line>
          <!-- Email -->
          <v-list-item to="#">
            <v-list-item-avatar>
              <v-icon v-text="'mdi-email-outline'" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ currentUser.email }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon v-text="'mdi-chevron-right'" />
            </v-list-item-action>
          </v-list-item>

          <v-divider inset />

          <!-- Email Confirmation -->
          <v-list-item>
            <v-list-item-avatar>
              <v-icon
                v-text="
                  currentUser.emailConfirmed
                    ? 'mdi-email-check-outline'
                    : 'mdi-email-alert'
                "
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ currentUser.emailConfirmed ? 'Confirmed' : 'Unconfirmed' }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="!currentUser.emailConfirmed"
                class="caption"
              >
                Action Required
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon v-text="'mdi-chevron-right'" />
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </section>

    <section>
      <v-layout justify-center>
        <v-btn color="error" text>
          <v-icon class="pr-1" v-text="'mdi-delete'" />
          <span>Delete Account</span>
        </v-btn>
      </v-layout>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { CurrentUserMixin } from '@/mixins';

@Component({
  middleware: ['auth'],
})
export default class Account extends mixins(CurrentUserMixin) {}
</script>

<style lang="sass" scoped>
.profile-card
  border: 1px solid #dadce0
  border-radius: 8px

.profile-email
  text-decoration: underline
</style>
