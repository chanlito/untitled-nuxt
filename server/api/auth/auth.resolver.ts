import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import {
  AuthService,
  FindSecurityTokenOptions,
  ResetPasswordInput,
  SendResetPasswordLinkInput,
  SignInInput,
  SignUpInput,
} from '.';
import { Context } from '../../lib/context';
import {
  IncorrectPasswordError,
  SecurityTokenNotFoundError,
  UserNotFoundError,
} from '../../lib/errors';
import { User, UserService } from '../user';
import { SecurityToken } from './security-token.type';

const { APP_URL = '' } = process.env;

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(returns => Boolean, { nullable: true })
  async resetPassword(
    @Arg('input') input: ResetPasswordInput,
  ): Promise<boolean> {
    const securityToken = await this.authService.findSecurityToken({
      value: input.token,
      type: 'RESET_PASSWORD',
    });

    if (!securityToken) {
      throw new SecurityTokenNotFoundError();
    }

    const user = await this.authService.findSecurityTokenOwner(
      securityToken.value,
    );

    if (!user) {
      return false;
    }

    const passwordHash = await this.authService.hashPassword(input.password);

    await this.authService.updatePassword(passwordHash, user.email);

    return true;
  }

  @Mutation(returns => Boolean, { nullable: true })
  async sendResetPasswordLink(
    @Arg('input')
    input: SendResetPasswordLinkInput,
  ): Promise<boolean> {
    const user = await this.userService.findUserByEmail(input.email);

    if (!user) {
      return false;
    }

    const options: Pick<
      Required<FindSecurityTokenOptions>,
      'email' | 'type'
    > = {
      email: input.email,
      type: 'RESET_PASSWORD',
    };

    let securityToken: SecurityToken;

    securityToken = await this.authService.findSecurityToken(options);

    if (!securityToken) {
      securityToken = await this.authService.createSecurityToken(options);
    }

    await this.authService.sendResetPasswordMail(input.email, {
      fullName: user.fullName,
      href: `${APP_URL}/reset-password?token=${securityToken.value}`,
    });

    return true;
  }

  @Mutation(returns => User)
  async signUp(
    @Arg('input') { fullName, email, password }: SignUpInput,
    @Ctx() { req }: Context,
  ): Promise<User> {
    const hash = await this.authService.hashPassword(password);

    const user = await this.authService.signUp({
      fullName,
      email,
      password: hash,
    });

    const securityToken = await this.authService.findSecurityToken({
      email,
      type: 'EMAIL_CONFIRMATION',
    });

    await this.authService.sendSignUpMail(email, {
      fullName: user.fullName,
      href: `${APP_URL}/confirm-email?token=${securityToken.value}`,
    });

    req.session!.user = user;

    return user;
  }

  @Mutation(returns => User)
  async signIn(
    @Arg('input') input: SignInInput,
    @Ctx() { req }: Context,
  ): Promise<User> {
    const user = await this.userService.findUserByEmail(input.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordCorrect = await this.authService.comparePasswords(
      input.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new IncorrectPasswordError();
    }

    req.session!.user = user;

    return user;
  }

  @Mutation(returns => Boolean, { nullable: true })
  async signOut(@Ctx() { req }: Context): Promise<boolean> {
    // delete  session
    req.session = null as any;

    return true;
  }
}
