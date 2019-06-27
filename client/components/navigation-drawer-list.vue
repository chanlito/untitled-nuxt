<template>
  <v-list shaped>
    <v-list-item
      v-for="({ label, icon, to }, i) in items"
      :key="i"
      :to="to"
      color="accent"
      exact
    >
      <v-list-item-icon>
        <v-icon v-text="icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="label" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class NavigationDrawerList extends Vue {
  items = [
    {
      to: { name: 'index' },
      label: 'Home',
      icon: 'mdi-home-variant',
    },
  ];
}
</script>
