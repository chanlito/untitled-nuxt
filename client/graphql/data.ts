import { Query } from './types';

export function initializeData({ req }: InitializeDataOptions) {
  const { appBar, theme, user } = req.session;

  const data: Partial<Query> = {
    appBar: {
      title: appBar && appBar.title ? appBar.title : 'Untitled',
      __typename: 'AppBar',
    },
    currentUser: user ? { ...user, __typename: 'User' } : null,
    theme: {
      variant: theme && theme.variant ? theme.variant : 'LIGHT',
      __typename: 'Theme',
    },
  };

  return data;
}

type InitializeDataOptions = { req: { session: any } };
