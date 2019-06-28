import { IsNotEmpty, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateFullNameInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  readonly fullName: string;
}
