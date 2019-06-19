<template>
  <form novalidate @submit.prevent="handleSubmit">
    <!-- Fields -->
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
    <v-text-field
      v-model="password"
      v-validate="{ required: true }"
      color="accent"
      label="Password"
      name="password"
      outlined
      required
      :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
      :type="showPassword ? 'text' : 'password'"
      :error-messages="errors.collect('password')"
      @click:append="showPassword = !showPassword"
    />

    <!-- Submit -->
    <v-btn
      :disabled="!!loading"
      :loading="!!loading"
      block
      class="sign-in__actions--submit"
      color="accent"
      type="submit"
    >
      Sign In
    </v-btn>

    <!-- Links -->
    <v-layout class="pt-3" justify-space-between>
      <nuxt-link
        class="sign-in__actions--link body-2 accent--text"
        :to="{ name: 'forgot-password' }"
      >
        Forgot password?
      </nuxt-link>
      <nuxt-link
        class="sign-in__actions--link body-2 accent--text"
        :to="{ name: 'sign-up' }"
      >
        Don't have an account?
      </nuxt-link>
    </v-layout>
  </form>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { CURRENT_USER, SIGN_IN } from '@/graphql/documents';
import { ThemeMixin, ValidationMixin } from '@/mixins';

@Component({ layout: 'auth', middleware: ['guest'] })
export default class SignIn extends mixins(ThemeMixin, ValidationMixin) {
  loading = 0;
  email = '';
  password = '';
  showPassword = false;

  async handleSubmit() {
    if (!(await this.$validator.validateAll())) return;

    try {
      this.loading++;
      await this.$apollo.mutate({
        mutation: SIGN_IN,
        variables: { email: this.email, password: this.password },
        update: (cache, { data }) => {
          cache.writeQuery({
            data: { currentUser: { ...data!.signIn, __typename: 'User' } },
            query: CURRENT_USER,
          });
        },
      });
      this.$router.replace({ name: 'index' });
    } catch (err) {
      console.error(err);
      this.mapErrorToFields(err, {
        email: ['USER_NOT_FOUND'],
        password: ['INCORRECT_PASSWORD'],
      });
      this.loading--;
    }
  }
}
</script>

<style lang="sass" scoped>
.sign-in
  &__actions
    &--submit.accent
      &.theme--light
        color: rgba(255,255,255, 1.0)
      &.theme--dark
        color: rgba(0, 0, 0, 0.67)
    &--link
      text-decoration: none
      &:hover
        text-decoration: underline
    +screen(xs-only)
      padding: 8px 0
</style>
