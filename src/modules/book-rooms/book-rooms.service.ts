import { Injectable, HttpException } from '@nestjs/common';
import { CreateBookRoomDto } from './dto/create-book-room.dto';
import { UpdateBookRoomDto } from './dto/update-book-room.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BookRoomsService {
  prisma = new PrismaClient();

  async getAllBookRooms(): Promise<any> {
    try {
      const res = await this.prisma.book_room.findMany();
      return {
        message: 'Get all book-room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createNewBookRoom(body: CreateBookRoomDto) {
    try {
      const {
        room_id,
        arrival_date,
        departure_date,
        numbers_of_guest,
        user_id,
      } = body;
      const res = await this.prisma.book_room.create({
        data: {
          room_id,
          arrival_date: new Date(arrival_date),
          departure_date: new Date(departure_date),
          numbers_of_guest,
          user_id,
        },
      });
      return {
        message: 'Create book-room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getBookRoomById(bookRoomId: number) {
    try {
      const res = await this.prisma.book_room.findFirst({
        where: { id: +bookRoomId },
      });
      return {
        message: 'Get book-room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateBookRoom(body: UpdateBookRoomDto, bookRoomId: number) {
    try {
      const {
        room_id,
        arrival_date,
        departure_date,
        numbers_of_guest,
        user_id,
      } = body;
      const res = await this.prisma.book_room.update({
        where: { id: +bookRoomId },
        data: {
          room_id,
          arrival_date: new Date(arrival_date),
          departure_date: new Date(departure_date),
          numbers_of_guest,
          user_id,
        },
      });
      return {
        message: 'Update book-room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteBookRoom(bookRoomId: number) {
    try {
      const res = await this.prisma.book_room.delete({
        where: { id: +bookRoomId },
      });
      return {
        message: 'Delete book-room successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getBookRoomByUserId(userId: number) {
    try {
      const res = await this.prisma.book_room.findMany({
        where: { user_id: +userId },
      });
      return {
        message: 'Get book-room by userid successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
