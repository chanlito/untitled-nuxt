import gql from 'graphql-tag';

import { UserFields } from './fragments';

export const UPDATE_FULLNAME = gql`
  mutation UpdateFullName($fullName: String!) {
    updateFullName(input: { fullName: $fullName }) {
      ...UserFields
    }
  }
  ${UserFields}
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(input: { token: $token, password: $password })
  }
`;

export const SEND_RESET_PASSWORD_LINK = gql`
  mutation SendResetPasswordLink($email: String!) {
    sendResetPasswordLink(input: { email: $email })
  }
`;

export const SET_APP_BAR_TITLE = gql`
  mutation SetAppBarTitle($title: String!) {
    setAppBarTitle(title: $title)
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      ...UserFields
    }
  }
  ${UserFields}
`;

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $fullName: String!) {
    signUp(input: { email: $email, password: $password, fullName: $fullName }) {
      ...UserFields
    }
  }
  ${UserFields}
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const SWITCH_THEME = gql`
  mutation SwitchTheme {
    switchTheme
  }
`;
