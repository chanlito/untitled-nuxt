import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { AuthService, SignInInput, SignUpInput } from '.';
import { Context } from '../../lib/context';
import { IncorrectPasswordError, UserNotFoundError } from '../../lib/errors';
import { User, UserService } from '../user';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(returns => User)
  async signUp(
    @Arg('input') input: SignUpInput,
    @Ctx() { req }: Context,
  ): Promise<User> {
    const password = await this.authService.hashPassword(input.password);
    const user = await this.authService.signUp({ ...input, password });
    req.session!.user = user;
    await this.authService.sendSignUpMail({
      to: user.email,
      metadata: { fullName: user.fullName },
    });
    return user;
  }

  @Mutation(returns => User)
  async signIn(
    @Arg('input') input: SignInInput,
    @Ctx() { req }: Context,
  ): Promise<User> {
    const user = await this.userService.findUserByEmail(input.email);
    if (!user) throw new UserNotFoundError();
    const isOK = await this.authService.comparePasswords(
      input.password,
      user.password,
    );
    if (!isOK) throw new IncorrectPasswordError();
    req.session!.user = user;
    return user;
  }

  @Mutation(returns => Boolean, { nullable: true })
  async signOut(@Ctx() { req }: Context): Promise<boolean> {
    req.session = null as any;
    return true;
  }
}
