import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ acessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    // Um token JWT consiste em um header, o payload e a assinatura
    if (user && (await bcrypt.compare(password, user.password))) {
      const jwtPayload: JwtPayload = { username };
      const acessToken: string = await this.jwtService.sign(jwtPayload);

      return { acessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async listUsers(): Promise<User[]> {
    return this.usersRepository.listUsers();
  }
}
