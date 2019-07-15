<template>
  <v-list dense shaped>
    <v-list-item
      v-for="({ label, icon, to }, i) in items"
      :key="i"
      :to="to"
      color="accent"
      exact
    >
      <v-list-item-icon :class="{ 'ml-2': !miniVariant }">
        <v-tooltip v-if="miniVariant" right :nudge-right="32">
          <template #activator="{ attrs, on }">
            <v-icon v-on="on" v-text="icon" />
          </template>
          {{ label }}
        </v-tooltip>
        <v-icon v-else v-text="icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="label" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class NavigationDrawerList extends Vue {
  @Prop({ type: Boolean, default: false }) miniVariant: boolean;

  items = [
    {
      to: { name: 'index' },
      label: 'Home',
      icon: 'mdi-home-variant',
    },
  ];
}
</script>
