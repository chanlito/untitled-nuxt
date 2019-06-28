<template>
  <div>
    <vv-navigation-toolbar :back-to="{ name: 'account' }" :title="'Name'" />
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
          persistent
          :done-disabled="isFormDirty && !isFormValid"
          :done-loading="loading"
          @cancel="resetName"
          @done="updateName"
        >
          <v-text-field
            v-model="fullName"
            v-validate="'required'"
            outlined
            color="accent"
            label="Full Name"
            data-vv-name="fullName"
            data-vv-as="full name"
            :error-messages="errors.collect('fullName')"
            @keyup.enter="updateName"
          />
        </vv-dialog-button>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { UPDATE_FULLNAME } from '@/graphql/documents';
import { CurrentUserMixin, ValidationMixin } from '@/mixins';

@Component({
  middleware: ['auth'],
})
export default class EditName extends mixins(
  CurrentUserMixin,
  ValidationMixin,
) {
  dialog = false;
  loading = false;
  fullName = '';

  mounted() {
    this.fullName = this.currentUser.fullName;
  }

  async updateName() {
    try {
      this.loading = true;
      await this.$apollo.mutate({
        mutation: UPDATE_FULLNAME,
        variables: { fullName: this.fullName },
      });
      this.dialog = false;
    } catch (err) {
      console.error(err);
      this.mapErrorToFields(err);
    } finally {
      this.loading = false;
    }
  }

  resetName() {
    this.dialog = false;
    this.fullName = this.currentUser.fullName;
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
