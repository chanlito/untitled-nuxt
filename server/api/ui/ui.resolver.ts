import { Request } from 'express';
import { Ctx, Mutation, Query, Resolver, Arg } from 'type-graphql';

import { AppBar, Theme, ThemeVariant } from './ui.types';

@Resolver()
export class UIResolver {
  @Query(returns => AppBar)
  async appBar(@Ctx('req') req: Request): Promise<AppBar> {
    return req.session && req.session.appBar;
  }

  @Mutation(returns => String)
  async setAppBarTitle(@Arg('title') title: string, @Ctx('req') req: Request) {
    req.session!.appBar = { ...req.session!.appBar, title };
    return title;
  }

  @Query(returns => Theme)
  async theme(@Ctx('req') req: Request): Promise<Theme> {
    return req.session && req.session.theme;
  }

  @Mutation(returns => ThemeVariant)
  async switchTheme(@Ctx('req') req: Request): Promise<ThemeVariant> {
    const theme = req.session && req.session.theme;
    if (!theme || theme.variant === 'LIGHT') {
      req.session!.theme = { variant: 'DARK' };
      return ThemeVariant.DARK;
    } else {
      req.session!.theme = { variant: 'LIGHT' };
      return ThemeVariant.LIGHT;
    }
  }
}
