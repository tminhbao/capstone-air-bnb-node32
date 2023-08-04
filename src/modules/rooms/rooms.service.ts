import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient } from '@prisma/client';

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

  async createNewRoom(body: CreateRoomDto): Promise<any> {
    try {
      const res = await this.prisma.room.create({
        data: body,
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

  async getRoomsPagination(pageIndex: number, pageSize: number): Promise<any> {
    try {
      try {
        const res = await this.prisma.room.findMany({
          // skip: +pageSize * (+pageIndex - 1),
          // take: +pageSize * (+pageIndex - 1),
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

  async updateRoom(body: UpdateRoomDto, roomId: number) {
    try {
      const res = await this.prisma.room.update({
        where: { id: +roomId },
        data: body,
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
