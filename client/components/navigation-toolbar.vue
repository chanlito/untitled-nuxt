<template>
  <div class="mb-4">
    <nav class="navigation-toolbar">
      <v-btn exact icon :to="backTo">
        <v-icon :size="24" v-text="'mdi-arrow-left'" />
      </v-btn>
      <v-toolbar-title
        class="headline navigation-toolbar__title"
        v-text="title"
      />
    </nav>
    <v-divider />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class NavigationHeader extends Vue {
  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: [String, Object], required: false })
  backTo: string | object;
}
</script>

<style lang="sass" scoped>
.navigation-toolbar
  height: 56px
  display: flex
  align-items: center
  margin: 0 -6px

  &__title
    padding-left: 15px
</style>
