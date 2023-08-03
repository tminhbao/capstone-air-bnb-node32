import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, comment } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../users/dto/users.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  prisma = new PrismaClient();

  async getAllComments(): Promise<any> {
    try {
      const res = await this.prisma.comment.findMany();
      return {
        message: 'Get all comments successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async createNewComment(user: UserDto, body: CreateCommentDto) {
    try {
      return user;

      // const res = await this.jwtService.verify(
      //   token,
      //   // this.configService.get('SECRET_KEY'),
      // );
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
