import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AppBar {
  @Field()
  title: string;
}

@ObjectType()
export class Theme {
  @Field(type => ThemeVariant)
  readonly variant: ThemeVariant;
}

export enum ThemeVariant {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}
