import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/users')
  listUsers(): Promise<User[]> {
    return this.authService.listUsers();
  }

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signIn')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ acessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
