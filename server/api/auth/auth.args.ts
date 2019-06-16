import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SignInInput {
  @Field()
  @IsEmail({}, { message: 'email address is not valid' })
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
