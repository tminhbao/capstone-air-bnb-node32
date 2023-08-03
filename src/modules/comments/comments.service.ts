import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, comment } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../users/dto/users.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  async createNewComment(user: UserDto, body: CreateCommentDto): Promise<any> {
    try {
      const { room_id, date_comment, content, stars } = body;

      try {
        const res = await this.prisma.comment.create({
          data: {
            user_id: +user?.id,
            room_id: +room_id,
            date_comment: new Date(date_comment),
            content,
            stars: +stars,
          },
        });

        return {
          message: 'Create a new comment successfully',
          content: res,
        };
      } catch (error) {
        return error.message;
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async updateComment(
    user: UserDto,
    body: UpdateCommentDto,
    commentId: string | number,
  ): Promise<any> {
    try {
      const { room_id, date_comment, content, stars } = body;

      const updateComment = {
        user_id: +user?.id,
        room_id: +room_id,
        date_comment: new Date(date_comment),
        content,
        stars: +stars,
      };

      const res = await this.prisma.comment.update({
        where: { id: +commentId },
        data: updateComment,
      });

      return {
        message: 'Update comment successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async deletComment(commentId: string | number): Promise<any> {
    try {
      await this.prisma.comment.delete({
        where: { id: +commentId },
      });
      return {
        message: 'Delete comment successfully',
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async getCommentsByRoomId(roomId: string | number): Promise<any> {
    try {
      const res = await this.prisma.comment.findMany({
        where: { room_id: +roomId },
      });
      return {
        message: 'Get all comments successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
