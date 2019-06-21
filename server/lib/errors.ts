import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-core';

export class IncorrectPasswordError extends ApolloError {
  constructor() {
    super('Password is incorrect', 'INCORRECT_PASSWORD');
  }
}

export class SecurityTokenNotFoundError extends ApolloError {
  constructor() {
    super('Security token was not found', 'SECURITY_TOKEN_NOT_FOUND');
  }
}

export class UnauthenticatedError extends AuthenticationError {
  constructor() {
    super('You are not authenticated');
  }
}

export class UnauthorizedError extends ForbiddenError {
  constructor() {
    super('You are not authorized');
  }
}

export class UserNotFoundError extends ApolloError {
  constructor() {
    super('User was not found', 'USER_NOT_FOUND');
  }
}
