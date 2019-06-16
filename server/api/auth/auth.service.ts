import { compare, hash } from 'bcrypt';
import moment from 'moment';
import { AuthChecker, ResolverData } from 'type-graphql';
import { Service } from 'typedi';

import { Prisma } from '../../generated/prisma-client';
import { Context } from '../../lib/context';
import { Mailer } from '../../lib/mailer';
import { uid } from '../../lib/uid';
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

  async signUp(data: SignUpData) {
    return this.db.createUser({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      role: 'USER',
      securityTokens: {
        create: [
          {
            token: uid(),
            type: 'EMAIL_CONFIRMATION',
            expiredAt: moment()
              .add('1', 'hour')
              .toISOString(),
          },
        ],
      },
    });
  }

  async sendSignUpMail({ to, metadata }: SendSignUpMailOptions) {
    return this.mailer.sendMail({
      to,
      html: `
        <p>Hi ${metadata.fullName},</p>
        <p>Thank you for signing up!</p>
      `,
    });
  }
}

interface AuthCheckerService {
  authChecker: AuthChecker<Context, string>;
}

interface SignUpData extends SignUpInput {}

interface SendSignUpMailOptions {
  to: string;
  metadata: { fullName: string };
}
