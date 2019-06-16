import { Service } from 'typedi';

import { Prisma } from '../../generated/prisma-client';

@Service()
export class UserService {
  constructor(private readonly db: Prisma) {}

  async findUserByEmail(email: string) {
    return this.db.user({ email });
  }

  async findUserByUk(uniqueKey: string) {
    const [user] = await this.db.users({
      where: { OR: [{ id: uniqueKey }, { email: uniqueKey }] },
      first: 1,
    });
    return user ? user : null;
  }
}
