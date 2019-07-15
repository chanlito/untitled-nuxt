import '@mdi/font/css/materialdesignicons.css';

import { THEME } from '@/graphql/documents';
import { Query } from '@/graphql/types';
import { Context } from '@nuxt/vue-app';
import Vue from 'vue';
import { VuetifyUseOptions } from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import Vuetify from 'vuetify/lib';

export default async function({ app, req }: Context & { req: any }) {
  const useOptions: VuetifyUseOptions = {};

  Vue.use(Vuetify, useOptions);

  let dark: boolean;

  if (process.server) {
    dark =
      req.session && req.session.theme && req.session.theme.variant === 'DARK';
  } else {
    // by now on client side, we should be able to access apolloProvider
    const apolloClient = app.apolloProvider!.defaultClient;
    const { theme } = (await apolloClient.cache.readQuery({
      query: THEME,
    })) as Query;
    dark = theme.variant === 'DARK';
  }

  // eslint-disable-next-line require-atomic-updates
  app.vuetify = new Vuetify({
    theme: {
      dark,
      themes: {
        light: {
          primary: colors.deepPurple.base,
          accent: colors.deepPurple.base,
          error: colors.red.base,
        },
        dark: {
          primary: colors.grey.darken3,
          accent: colors.orange.base,
          error: colors.red.base,
        },
      },
    },
  });
}
