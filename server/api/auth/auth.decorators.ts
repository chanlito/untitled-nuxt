import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { createParamDecorator } from 'type-graphql';
import { Container } from 'typedi';

import { Context } from '../../lib/context';
import { UserService } from '../user';

export function CurrentUser() {
  return createParamDecorator<Context>(({ context }) => context.currentUser);
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueValidatorConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isEmailUnique', async: true })
class IsEmailUniqueValidatorConstraint implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const userService = Container.get(UserService);
    return !(await userService.findUserByEmail(email));
  }

  defaultMessage() {
    return 'This email is already registered';
  }
}
