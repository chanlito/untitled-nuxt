import gql from 'graphql-tag';

import { AppBarFields, ThemeFields, UserFields } from './fragments';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      ...UserFields
    }
  }
  ${UserFields}
`;

export const APP_BAR = gql`
  query AppBar {
    appBar {
      ...AppBarFields
    }
  }
  ${AppBarFields}
`;

export const THEME = gql`
  query Theme {
    theme {
      ...ThemeFields
    }
  }
  ${ThemeFields}
`;
