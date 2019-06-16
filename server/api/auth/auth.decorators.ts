import { createParamDecorator } from 'type-graphql';

import { Context } from '../../lib/context';

export function CurrentUser() {
  return createParamDecorator<Context>(({ context }) => context.currentUser);
}
