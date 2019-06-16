import { SmartQuery } from 'vue-apollo-decorator';
import { Component, Vue } from 'nuxt-property-decorator';
import { SWITCH_THEME, THEME } from '@/graphql/documents';
import { Theme } from '@/graphql/types';

@Component
export class ThemeMixin extends Vue {
  @SmartQuery({ query: THEME, prefetch: true })
  theme: Theme;

  async switchTheme() {
    await this.$apollo.mutate({
      mutation: SWITCH_THEME,
      update: (cache, result) => {
        cache.writeQuery({
          data: {
            theme: { variant: result.data.switchTheme, __typename: 'Theme' }, // TODO: type this!
          },
          query: THEME,
        });
      },
    });

    // TODO: Find out why vuetify theme styles doesn't update correctly!
    // this.$vuetify.theme.dark = this.theme.value === 'DARK';

    // HACK:
    window.location.reload();
  }
}
