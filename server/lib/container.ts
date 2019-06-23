import { Container } from 'typedi';

import { prisma as db } from '../generated/prisma-client';

export function configureContainer() {
  Container.set('db', db);
}
