import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      //23505 - Duplicate Username
      if (error.code === '23505') {
        throw new ConflictException('Username Already Exists');
      } else {
        console.log(error.code);
        throw new InternalServerErrorException();
      }
    }
  }

  async listUsers(): Promise<User[]> {
    return this.find();
  }
}
