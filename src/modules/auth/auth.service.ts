import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();
  async signUp(userSignUp: RegisterDto): Promise<any> {
    try {
      const { full_name, email, pass_word, phone, birth_day, gender, role } =
        userSignUp;

      const checkEmailExist = await this.prisma.user.findFirst({
        where: { email },
      });

      if (checkEmailExist) {
        throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
      } else {
        let newUser = {
          full_name,
          email,
          pass_word: bcrypt.hashSync(pass_word, 10),
          phone,
          birth_day,
          gender,
          role,
        };

        try {
          await this.prisma.user.create({
            data: newUser,
          });
        } catch (error) {
          return {
            error,
          };
        }

        return {
          message: 'Create a new user successfully',
          content: newUser,
        };
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async signIn(userSignIn: LoginDto): Promise<any> {
    try {
      const { email, pass_word } = userSignIn;
      const user = await this.prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
      }

      if (bcrypt.compareSync(pass_word, user?.pass_word)) {
        const token = await this.jwtService.signAsync(
          { user },
          {
            secret: this.configService.get<string>('SECRET_KEY'),
            expiresIn: this.configService.get<string>('JWT_EXPIRED_TIME'),
          },
        );

        return {
          message: 'Login successfully',
          accessToken: token,
          expiresIn: this.configService.get<string>('JWT_EXPIRED_TIME'),
        };
      } else {
        throw new HttpException(
          'Password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
