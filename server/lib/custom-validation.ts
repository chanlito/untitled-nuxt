import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import Container from 'typedi';

import { UserService } from '../api/user';

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
