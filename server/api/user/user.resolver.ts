import { Request } from 'express';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';

import { User, UserService } from '.';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User)
  @Authorized()
  async currentUser(@Ctx('req') req: Request) {
    return this.userService.findUserByUk(req.session!.user.id);
  }
}
