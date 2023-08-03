import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterDto })
  @ApiBearerAuth()
  @HttpCode(200)
  @Post('/signup')
  signUp(@Body() body: RegisterDto): Promise<any> {
    return this.authService.signUp(body);
  }

  @ApiBody({ type: LoginDto })
  @ApiBearerAuth()
  @HttpCode(200)
  @Post('/signin')
  signIn(@Body() body: LoginDto): Promise<any> {
    return this.authService.signIn(body);
  }
}
