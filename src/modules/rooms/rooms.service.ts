import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient } from '@prisma/client';
import { UserDto } from '../users/dto/users.dto';

@Injectable()
export class RoomsService {
  prisma = new PrismaClient();
  async getAllRooms(): Promise<any> {
    try {
      const res = await this.prisma.room.findMany();
      return {
        message: 'Get all rooms successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createNewRoom(body: CreateRoomDto, user: UserDto): Promise<any> {
    try {
      const res = await this.prisma.room.create({
        data: { ...body, user_id: +user.id },
      });
      return {
        message: 'Create a new room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getRoomByPlaceId(placeId: number): Promise<any> {
    try {
      const res = await this.prisma.room.findFirst({
        where: { place_id: +placeId },
      });
      return {
        message: 'Get room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getRoomsPagination(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<any> {
    try {
      try {
        const res = await this.prisma.room.findMany({
          where: {
            OR: [
              { room_name: { contains: keyword } },
              { description: { contains: keyword } },
              { image: { contains: keyword } },
            ],
          },
          skip: +pageIndex - 1,
          take: +pageSize,
        });
        return {
          message: 'Get room pagination successfully',
          content: res,
        };
      } catch (error) {
        return error.message;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getRoomByRoomId(roomId: number): Promise<any> {
    try {
      const res = await this.prisma.room.findFirst({
        where: { id: +roomId },
      });
      return {
        message: 'Get room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateRoom(body: UpdateRoomDto, roomId: number, user: UserDto) {
    try {
      const res = await this.prisma.room.update({
        where: { id: +roomId },
        data: { ...body, user_id: +user?.id },
      });
      return {
        message: 'Update room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteRoom(roomId: number) {
    try {
      const res = await this.prisma.room.delete({
        where: { id: +roomId },
      });
      return {
        message: 'Delete room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async uploadImageRoom(roomId: number, file: Express.Multer.File) {
    try {
      const res = await this.prisma.room.findFirst({
        where: { id: +roomId },
      });
      res.image = file.filename;
      const result = await this.prisma.room.update({
        where: { id: +roomId },
        data: res,
      });
      return {
        message: 'Upload image room successfully',
        content: result,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
