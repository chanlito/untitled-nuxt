import { IsEmail, MaxLength, MinLength, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsString()
  readonly token: string;

  @Field()
  @IsString()
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
