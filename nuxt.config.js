const { ContextReplacementPlugin } = require('webpack');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const sass = {
  fiber: require('fibers'),
  implementation: require('sass'),
};

/**
 * Nuxt Configuration.
 * @type {import('@nuxt/config').default}
 */
const config = {
  loading: {
    color: '#FFFFFF',
  },
  head: {
    title: 'Untitled',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Untitled is a SSR web application.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap',
      },
    ],
  },
  css: ['@/assets/styles/main'],

  /**
   * Define the build directory.
   */
  buildDir: 'build/client',
  /**
   * Define the source directory.
   */
  srcDir: 'client',
  /**
   * Customize the webpack configuration.
   */
  build: {
    loaders: {
      sass: sass,
      scss: sass,
    },
    typescript: {
      typeCheck: './tsconfig.json',
    },
    /**
     * Use the `extend` function to customize webpack configuration.
     */
    extend(config, ctx) {
      if (config.module && ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(build|dist|server|node_modules|types|typings)/,
        });
      }
    },
    /**
     * `VuetifyLoaderPlugin` will automatically import all the vuetify components
     * you use, where you use them.
     *
     * This will also make code-splitting more effective, as webpack will
     * only load the components required for that chunk to be displayed.
     */
    plugins: [
      new ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb/),
      new VuetifyLoaderPlugin({
        match(originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('vv-')) {
            const componentName = kebabTag.substring(3);
            return [
              camelTag,
              `import ${camelTag} from '@/components/${componentName}.vue'`,
            ];
          }
        },
      }),
    ],
    /**
     * The `transpile` property allows dependencies to be transpiled by Babel.
     */
    transpile: [/^vue-apollo-decorator|^vuetify/],
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
  },
  /**
   * The `plugins` property lets you add vue.js plugins easily to your main application.
   */
  plugins: ['@/plugins/apollo', '@/plugins/vee-validate', '@/plugins/vuetify'],
  /**
   * The `modules` property lets you add additional Nuxt.js modules
   * which can extend it's core functionality and add endless integrations.
   */
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    sass: [
      '@/assets/styles/_variables.sass',
      '@/assets/styles/_mixins.sass',
      '@/assets/styles/_utilities.sass',
      '@/assets/styles/_transitions.sass',
    ],
  },
};

module.exports = config;
