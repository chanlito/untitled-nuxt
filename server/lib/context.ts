import { Request, Response } from 'express';
import Container from 'typedi';

import { UserService } from '../api/user';
import { User } from '../generated/prisma-client';

export async function context({ connection, req, res }: NetworkContext) {
  const ctx: Omit<Context, 'currentUser'> = {
    connection,
    req,
    res,
  };

  // WS
  if (connection) {
    const currentUser: User | null = connection.context.currentUser;
    const context: Context = {
      ...ctx,
      currentUser,
    };
    return context;
  }

  // HTTP
  const currentUser =
    req.session && req.session.user
      ? await Container.get(UserService).findUserByEmail(req.session.user.email)
      : null;
  const context: Context = {
    ...ctx,
    currentUser,
  };
  return context;
}

export interface Context extends NetworkContext {
  currentUser: User | null;
}

export interface NetworkContext {
  connection?: any;
  payload?: any;
  req: Request;
  res: Response;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
