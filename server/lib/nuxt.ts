import { Builder, Nuxt } from 'nuxt';
import { resolve } from 'path';

const nuxtConfig = require(resolve('.', 'nuxt.config.js'));
const dev = process.env.NODE_ENV === 'development';

/**
 * Create a Nuxt instance.
 */
export const nuxt = new Nuxt({ dev, ...nuxtConfig });

/**
 * Run Nuxt.js builder while in `development` mode.
 */
if (dev) new Builder(nuxt).build();
