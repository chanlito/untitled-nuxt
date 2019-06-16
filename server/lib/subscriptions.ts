import { SubscriptionServerOptions } from 'apollo-server-core';
import Cookies from 'cookies';
import { Container } from 'typedi';

import { UserService } from '../api/user';
import { UnauthenticatedError } from './errors';

const { SESSION_SECRET = '' } = process.env;

export const subscriptions: Partial<SubscriptionServerOptions> = {
  /**
   * Apollo Server subscription path.
   * Also it exposes lifecycle hooks you can use to manage subscriptions and clients.
   */
  path: '/',

  /**
   * `onConnect` - called upon client connection, with the connectionParams passed to
   * SubscriptionsClient - you can return a Promise and reject the connection by throwing an exception.
   * The resolved return value will be appended to the GraphQL context of your subscriptions.
   */
  async onConnect(connectionParams, websocket, { request }) {
    const cookies = new Cookies(request, null as any, {
      keys: [SESSION_SECRET],
    });

    const __session = cookies.get('__session', { signed: true });
    if (!__session) throw new UnauthenticatedError();

    const session = JSON.parse(
      Buffer.from(__session, 'base64').toString('utf8'),
    );
    if (!session.user) throw new UnauthenticatedError();

    const currentUser = await Container.get(UserService).findUserByEmail(
      session.user.email,
    );
    if (!currentUser) throw new UnauthenticatedError();

    return { currentUser };
  },

  /**
   * `onDisconnect` - called when the client disconnects.
   */
  async onDisconnect(websocket, context) {},
};
