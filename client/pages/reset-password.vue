<template>
  <form novalidate @submit.prevent="handleSubmit">
    <!-- Password -->
    <v-text-field
      ref="password"
      v-model="password"
      v-validate="{ required: true }"
      color="accent"
      label="Password"
      outlined
      required
      name="password"
      :error-messages="errors.collect('password')"
      :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
    />

    <!-- Password Confirm -->
    <v-text-field
      v-model="passwordConfirm"
      v-validate="{ required: true, confirmed: 'password' }"
      color="accent"
      label="Password Confirm"
      outlined
      required
      name="passwordConfirm"
      data-vv-as="password"
      :error-messages="errors.collect('passwordConfirm')"
      :append-icon="
        showPasswordConfirm ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
      "
      :type="showPasswordConfirm ? 'text' : 'password'"
      @click:append="showPasswordConfirm = !showPasswordConfirm"
    />

    <v-btn
      :disabled="!!loading"
      :loading="!!loading"
      block
      class="submit-button"
      color="accent"
      type="submit"
    >
      Change Password
    </v-btn>
  </form>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { RESET_PASSWORD } from '@/graphql/documents';
import { ValidationMixin } from '@/mixins';

@Component({ layout: 'auth', middleware: ['guest'] })
export default class ResetPassword extends mixins(ValidationMixin) {
  loading = 0;
  password = '';
  passwordConfirm = '';
  showPassword = false;
  showPasswordConfirm = false;

  get token(): string {
    return this.$route.query.token ? this.$route.query.token.toString() : '';
  }

  async handleSubmit() {
    try {
      this.loading++;
      if (!(await this.$validator.validateAll())) return;
      await this.$apollo.mutate({
        mutation: RESET_PASSWORD,
        variables: { token: this.token, password: this.password },
      });
      this.$router.replace({ name: 'sign-in' });
    } catch (err) {
      this.mapErrorToFields(err, {});
    } finally {
      this.loading--;
    }
  }
}
</script>
