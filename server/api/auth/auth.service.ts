import { compare, hash } from 'bcrypt';
import moment from 'moment';
import { AuthChecker, ResolverData } from 'type-graphql';
import { Service } from 'typedi';

import {
  Prisma,
  SecurityTokenType,
  SecurityTokenWhereInput,
} from '../../generated/prisma-client';
import { Context } from '../../lib/context';
import { Mailer } from '../../lib/mailer';
import { uid } from '../../lib/uid';
import { User } from '../user';
import { SignUpInput } from './auth.args';

@Service()
export class AuthService implements AuthCheckerService {
  constructor(private readonly db: Prisma, private readonly mailer: Mailer) {}

  async authChecker(
    { context: { currentUser } }: ResolverData<Context>,
    roles: string[],
  ) {
    if (roles.length === 0) return !!currentUser;
    if (!currentUser) return false;
    if (roles.includes(currentUser.role)) return true;
    return false;
  }

  async comparePasswords(password: string, passwordHash: string) {
    return compare(password, passwordHash);
  }

  async hashPassword(password: string) {
    return hash(password, 10);
  }

  async updatePassword(passwordHash: string, email: string): Promise<void> {
    await this.db.updateUser({
      data: { password: passwordHash },
      where: { email },
    });
  }

  async createSecurityToken({ email, type }: CreateSecurityToken) {
    return this.db.createSecurityToken({
      type,
      value: uid(),
      expiredAt: moment()
        .add('5', 'minutes')
        .toISOString(),
      user: { connect: { email } },
    });
  }

  async findSecurityToken({ value, email, type }: FindSecurityTokenOptions) {
    const where: SecurityTokenWhereInput = {
      type,
      expiredAt_gte: moment().toISOString(),
    };

    if (value) {
      where.value = value;
    }

    if (email) {
      where.user = { email };
    }

    const [token] = await this.db.securityTokens({ where, last: 1 });

    return token;
  }

  async findSecurityTokenOwner(value: string): Promise<User | null> {
    return this.db.securityToken({ value }).user();
  }

  async signUp(data: SignUpData) {
    return this.db.createUser({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      role: 'USER',
      securityTokens: {
        create: [
          {
            value: uid(),
            type: 'EMAIL_CONFIRMATION',
            expiredAt: moment()
              .add('1', 'hour')
              .toISOString(),
          },
        ],
      },
    });
  }

  async sendSignUpMail(email: string, metadata: SendSignUpMailMetadata) {
    return this.mailer.sendMailTemplate(
      email,
      'Confirm Your Email',
      'sign-up',
      { ...metadata },
    );
  }

  async sendResetPasswordMail(
    to: string,
    metadata: SendResetPasswordMailMetadata,
  ) {
    return this.mailer.sendMailTemplate(
      to,
      'Reset Password',
      'forgot-password',
      { ...metadata },
    );
  }
}

export interface CreateSecurityToken {
  email: string;
  type: SecurityTokenType;
}

export interface FindSecurityTokenOptions {
  value?: string;
  email?: string;
  type: SecurityTokenType;
}

interface AuthCheckerService {
  authChecker: AuthChecker<Context, string>;
}

interface SignUpData extends SignUpInput {}

interface SendSignUpMailMetadata {
  fullName: string;
  href: string;
}

interface SendResetPasswordMailMetadata {
  fullName: string;
  href: string;
}
