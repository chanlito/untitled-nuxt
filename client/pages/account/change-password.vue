<template>
  <div>
    <vv-navigation-toolbar :back-to="{ name: 'account' }" :title="'Password'" />
    <p class="body-2">
      Choose a strong password and don't reuse it for other accounts.
    </p>
    <v-card flat outlined>
      <v-card-text class="pt-4 pb-0">
        <v-text-field outlined type="password" label="Current Password" />
        <v-text-field
          outlined
          type="password"
          label="New Password"
          hint="Use at least 8 characters. Don’t use a password from another site, or something too obvious like your pet’s name."
        />
        <v-text-field outlined type="password" label="Confirm Password" />
      </v-card-text>
      <v-card-actions class="pb-3 pt-0 px-3">
        <v-btn disabled color="primary">Change Pasword</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  middleware: ['auth'],
})
export default class ChangePassword extends Vue {}
</script>
