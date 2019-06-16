import 'reflect-metadata';

import { displayStartupMessage } from './lib/fmt';
import { createGraphQLServer } from './lib/server';

(async () => {
  const { server } = await createGraphQLServer();
  server.listen(process.env.PORT, () => displayStartupMessage());
})()
  .then(() => {
    process.on('SIGTERM', () => process.exit(0));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
