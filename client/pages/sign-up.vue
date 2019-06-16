<template>
  <form novalidate @submit.prevent="handleSubmit">
    <v-card class="sign-up elevation-3">
      <v-layout class="sign-up__avatar" column align-center justify-center>
        <v-icon
          class="mb-1 cursor-pointer"
          color="accent"
          :size="64"
          @click="switchTheme"
          v-text="'mdi-shield-lock'"
        />
      </v-layout>
      <v-layout class="sign-up__content" column>
        <v-text-field
          v-model="email"
          v-validate="{ required: true, email: true }"
          append-icon="mdi-email-variant"
          autocomplete="off"
          color="accent"
          dense
          label="Email"
          name="email"
          outlined
          required
          :error-messages="errors.collect('email')"
        />
        <v-text-field
          v-model="password"
          v-validate="{ required: true }"
          autocomplete="off"
          color="accent"
          dense
          label="Password"
          name="password"
          outlined
          required
          :append-icon="
            showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
          "
          :type="showPassword ? 'text' : 'password'"
          :error-messages="errors.collect('password')"
          @click:append="showPassword = !showPassword"
        />
        <v-text-field
          v-model="fullName"
          v-validate="{ required: true }"
          append-icon="mdi-account-circle-outline"
          autocomplete="off"
          color="accent"
          dense
          label="Full Name"
          name="fullName"
          outlined
          required
          data-vv-as="full name"
          :error-messages="errors.collect('fullName')"
        />
      </v-layout>
      <v-layout class="sign-up__actions" align-center column>
        <v-btn
          :disabled="!!loading"
          :loading="!!loading"
          block
          class="sign-up__actions--submit"
          color="accent"
          type="submit"
        >
          Sign Up
        </v-btn>
        <nuxt-link
          class="sign-up__actions--link mt-3 body-2 accent--text"
          :to="{ name: 'sign-in' }"
        >
          Already have an account?
        </nuxt-link>
      </v-layout>
    </v-card>
  </form>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { CURRENT_USER, SIGN_UP } from '@/graphql/documents';
import { ThemeMixin, ValidationMixin } from '@/mixins';

@Component({ layout: 'auth', middleware: ['guest'] })
export default class SignUp extends mixins(ThemeMixin, ValidationMixin) {
  loading = 0;
  fullName = '';
  email = '';
  password = '';
  showPassword = false;

  async handleSubmit() {
    if (!(await this.$validator.validateAll())) return;

    try {
      this.loading++;
      await this.$apollo.mutate({
        mutation: SIGN_UP,
        variables: {
          email: this.email,
          password: this.password,
          fullName: this.fullName,
        },
        update: (cache, { data }) => {
          cache.writeQuery({
            data: { currentUser: { ...data!.signUp, __typename: 'User' } },
            query: CURRENT_USER,
          });
        },
      });
      this.$router.replace({ name: 'index' });
    } catch (err) {
      this.mapErrorToFields(err, {});
      this.loading--;
    }
  }
}
</script>

<style lang="sass" scoped>
.sign-up
  border-radius: 8px
  padding: 48px
  +screen(xs-only)
    padding: 0
  +screen(xs-only)
    background-color: transparent
    border: none
    box-shadow: none !important
  &__avatar
    padding-bottom: 24px
  &__actions
    &--submit.accent
      &.theme--light
        color: #fff
      &.theme--dark
        color: rgba(0, 0, 0, 0.67)
    &--link
      text-decoration: none
      &:hover
        text-decoration: underline
    +screen(xs-only)
      padding: 8px 0
</style>
