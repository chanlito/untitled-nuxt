import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { IsUniqueEmail } from '../../lib/custom-validation';

@InputType()
export class ResetPasswordInput {
  @Field()
  readonly token: string;

  @Field()
  @MinLength(4)
  @MaxLength(100)
  readonly password: string;
}

@InputType()
export class SendResetPasswordLinkInput {
  @Field()
  @IsEmail()
  readonly email: string;
}

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  readonly password: string;
}

@InputType()
export class SignUpInput {
  @Field()
  @IsEmail()
  @IsUniqueEmail()
  @MaxLength(100)
  readonly email: string;

  @Field()
  @MinLength(4)
  @MaxLength(100)
  readonly password: string;

  @Field()
  @MaxLength(100)
  readonly fullName: string;
}
