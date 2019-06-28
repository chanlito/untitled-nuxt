<template>
  <div>
    <vv-navigation-toolbar :back-to="{ name: 'account' }" :title="title" />
    <p class="body-2">
      Your name will be used throughout the application.
    </p>
    <v-card flat outlined>
      <v-layout align-center class="pa-3">
        <span class="body-1">
          {{ currentUser.fullName }}
        </span>
        <v-spacer />
        <vv-dialog-button
          v-model="dialog"
          title="Change Name"
          icon="mdi-circle-edit-outline"
          :loading="loading"
          @done="updateName"
        >
          <v-text-field
            v-model="currentUser.fullName"
            color="accent"
            label="Full Name"
            outlined
          />
        </vv-dialog-button>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { CurrentUserMixin } from '@/mixins';

@Component
export default class EditName extends mixins(CurrentUserMixin) {
  title = 'Name';

  dialog = false;
  loading = false;

  updateName() {
    console.log('Update name...');
    // TODO: API
  }
}
</script>

<style lang="sass">
.modal
  width: 340px
  +screen(xs-only)
    width: 100%
</style>

<style lang="sass" scoped>
.modal-title
  +screen(xs-only)
    padding-left: 16px
</style>
