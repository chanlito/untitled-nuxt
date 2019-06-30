<template>
  <div>
    <vv-navigation-toolbar :back-to="{ name: 'account' }" :title="'Gender'" />
    <p class="body-2">
      Indicating your gender lets Untitled know how to refer to you.
    </p>

    <v-card flat outlined>
      <v-card-text>
        <v-radio-group
          :disabled="updating"
          :value="selectedGender"
          @change="updateGender"
        >
          <v-radio
            v-for="gender in genders"
            :key="gender.label"
            :label="gender.label"
            :value="gender.value"
          />
        </v-radio-group>
        <p class="body-2">
          <v-icon>mdi-lock</v-icon>
          We maybe use the information about your gender in the application.
        </p>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="showSnackBar" bottom left :timeout="0">
      {{ updatingText }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { CurrentUserMixin } from '@/mixins';

@Component({
  middleware: ['auth'],
})
export default class ChangeGender extends mixins(CurrentUserMixin) {
  updating = false;
  showSnackBar = false;
  selectedGender: string | null = null;

  genders = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Rather not say', value: 'NULL' },
  ];

  get updatingText(): string {
    return this.updating ? 'Updating...' : 'Updated';
  }

  created() {
    this.selectedGender = this.currentUser.gender
      ? this.currentUser.gender
      : 'NULL';
  }

  async updateGender(gender: 'MALE' | 'FEMALE' | 'NULL') {
    const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t));

    try {
      this.updating = true;
      this.showSnackBar = true;
      await delay(5000);
      this.selectedGender = gender;

      // TODO: call api

      this.updating = false;
      setTimeout(() => {
        if (!this.updating) this.showSnackBar = false;
      }, 5000);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
