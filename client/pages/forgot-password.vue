<template>
  <form v-if="!success" novalidate @submit.prevent="handleSubmit">
    <v-text-field
      v-model="email"
      v-validate="{ required: true, email: true }"
      append-icon="mdi-email-variant"
      autocomplete="email"
      color="accent"
      label="Email"
      name="email"
      outlined
      required
      :error-messages="errors.collect('email')"
    />

    <v-btn
      :disabled="!!loading"
      :loading="!!loading"
      block
      class="submit-button"
      color="accent"
      type="submit"
    >
      Reset Password
    </v-btn>

    <v-layout justify-center>
      <nuxt-link
        class="link mt-3 body-2 accent--text text-xs-center"
        :to="{ name: 'sign-in' }"
      >
        Sign in instead
      </nuxt-link>
    </v-layout>
  </form>

  <div v-else>
    <h2 class="mb-3 title text-xs-center">Password Reset Email Sent!</h2>
    <p class="body-1" style="text-align: justify">
      Follow the directions in the email to reset your password.
    </p>
    <v-layout justify-center>
      <v-btn color="primary" :to="{ name: 'sign-in' }">Done</v-btn>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { SEND_RESET_PASSWORD_LINK } from '@/graphql/documents';
import { ValidationMixin } from '@/mixins';

@Component({ layout: 'auth', middleware: ['guest'] })
export default class SignIn extends mixins(ValidationMixin) {
  loading = 0;
  email = '';
  success = false;

  async handleSubmit() {
    try {
      if (!(await this.$validator.validateAll())) return;
      this.loading++;
      await this.$apollo.mutate({
        mutation: SEND_RESET_PASSWORD_LINK,
        variables: { email: this.email },
      });
      this.success = true;
      await this.$validator.reset();
      this.email = '';
    } catch (err) {
      this.mapErrorToFields(err, {});
    } finally {
      this.loading--;
    }
  }
}
</script>

<style lang="sass" scoped>
.submit-button.accent
  &.theme--light
    color: #fff
  &.theme--dark
    color: rgba(0, 0, 0, 0.67)

.link
  background-color: transparent
  text-decoration: none
  &:hover
    text-decoration: underline
</style>
