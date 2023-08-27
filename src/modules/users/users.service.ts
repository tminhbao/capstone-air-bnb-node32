import { Injectable, HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  prisma = new PrismaClient();

  async getAllUsers(): Promise<any> {
    try {
      const res = await this.prisma.user.findMany();
      return {
        message: 'Get all users successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createNewUser(body: CreateUserDto) {
    try {
      const {
        full_name,
        email,
        pass_word,
        phone,
        birth_day,
        gender,
        avatar,
        role,
      } = body;
      const userExist = await this.prisma.user.findFirst({
        where: { email: email },
      });
      if (userExist) {
        return {
          message: 'Email already exists',
        };
      }
      const res = await this.prisma.user.create({
        data: {
          full_name,
          email,
          pass_word: bcrypt.hashSync(pass_word, 10),
          phone,
          birth_day,
          gender,
          avatar,
          role,
        },
      });
      return {
        message: 'Create new user successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteUser(userId: number) {
    try {
      const res = await this.prisma.user.delete({
        where: { id: +userId },
      });
      return {
        message: 'Delete user successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getUserPagination(
    pageSize: number,
    pageIndex: number,
    keyword: string,
  ) {
    try {
      const res = await this.prisma.user.findMany({
        skip: +pageIndex - 1,
        take: +pageSize,
        where: {
          OR: [
            { full_name: { contains: keyword } },
            { avatar: { contains: keyword } },
          ],
        },
      });
      return {
        message: 'Get user pagination successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getUserDetailByUserId(userId: number) {
    try {
      const res = await this.prisma.user.findFirst({
        where: { id: +userId },
      });
      return {
        message: 'Get user detail successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateUserInfo(body: UpdateUserDto, userId: number) {
    try {
      const res = await this.prisma.user.update({
        where: { id: +userId },
        data: body,
      });
      return {
        message: 'Update user info successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async searchUserByName(full_name: string) {
    try {
      const res = await this.prisma.user.findMany({
        where: { full_name: { contains: full_name } },
      });
      return {
        message: 'Find user info successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async uploadAvatar(file: Express.Multer.File, user: UserDto): Promise<any> {
    try {
      let userUpdate = await this.prisma.user.findFirst({
        where: { id: +user?.id },
      });
      userUpdate.avatar = file.filename;
      const res = await this.prisma.user.update({
        where: { id: user.id },
        data: userUpdate,
      });
      return {
        message: 'Upload avatar successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
