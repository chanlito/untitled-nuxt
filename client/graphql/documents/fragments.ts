import gql from 'graphql-tag';

export const AppBarFields = gql`
  fragment AppBarFields on AppBar {
    title
  }
`;

export const ThemeFields = gql`
  fragment ThemeFields on Theme {
    variant
  }
`;

export const UserFields = gql`
  fragment UserFields on User {
    id
    email
    emailConfirmed
    fullName
    dateOfBirth
    gender
    passwordLastChanged
    role
    createdAt
  }
`;
