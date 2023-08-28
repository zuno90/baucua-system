import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByUsername(username: string) {
    const user = await this.userRepository.get({ where: { username } });
    return user;
  }

  async getUsers() {
    const users = await this.userRepository.getAll({});
    for (const u of users) delete u.password;
    return users;
  }

  async getUser(id: number) {
    const user = await this.userRepository.get({ where: { id: +id } });
    delete user.password;
    return user;
  }

  async createUser(data: any) {
    const newUser = await this.userRepository.create({ data });
    return newUser;
  }
}
