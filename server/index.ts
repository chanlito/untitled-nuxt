import 'reflect-metadata';

import { displayStartupMessage } from './lib/fmt';
import { createGraphQLServer } from './lib/server';

const { PORT = '9000' } = process.env;

(async () => {
  const { server } = await createGraphQLServer();
  server.listen(PORT, () => displayStartupMessage());
})()
  .then(() => {
    process.on('SIGTERM', () => process.exit(0));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
