<template>
  <form novalidate @submit.prevent="handleSubmit">
    <v-card class="sign-in elevation-3">
      <v-layout class="sign-in__avatar" column align-center justify-center>
        <v-icon
          class="mb-1 cursor-pointer"
          color="accent"
          :size="64"
          @click="switchTheme"
          v-text="'mdi-shield-lock'"
        />
      </v-layout>
      <v-layout class="sign-in__content" column>
        <v-flex>
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
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="password"
            v-validate="{ required: true }"
            color="accent"
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
        </v-flex>
      </v-layout>
      <v-layout class="sign-in__actions" column>
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
        <v-layout class="pt-3" justify-space-between>
          <nuxt-link
            class="sign-in__actions--link body-2 accent--text"
            :to="{ name: 'index' }"
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
      </v-layout>
    </v-card>
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
