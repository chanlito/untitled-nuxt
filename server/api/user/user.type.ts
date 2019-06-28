import { Authorized, Field, ID, ObjectType } from 'type-graphql';

import {
  Gender as IGender,
  Role as IRole,
  User as IUser,
} from '../../generated/prisma-client';

@ObjectType()
export class User implements IUser {
  @Field(type => ID)
  readonly id: string;

  @Field()
  readonly email: string;

  @Field()
  readonly emailConfirmed: boolean;

  @Field()
  @Authorized('ADMIN')
  readonly password: string;

  @Field({ nullable: true })
  passwordLastChanged?: string;

  @Field()
  readonly fullName: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field(type => Gender, { nullable: true })
  readonly gender?: IGender;

  @Field(type => Role)
  readonly role: IRole;

  @Field()
  readonly createdAt: string;

  @Field()
  readonly updatedAt: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
