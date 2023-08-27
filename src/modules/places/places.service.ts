import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlacesService {
  prisma = new PrismaClient();
  async getAllPlaces(): Promise<any> {
    try {
      const res = await this.prisma.place.findMany();
      return {
        message: 'Get all places successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async createNewPlace(body: CreatePlaceDto): Promise<any> {
    try {
      await this.prisma.place.create({ data: body });
      return {
        message: 'Create a new place successfully',
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async getAllPlacesPagination(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<any> {
    try {
      try {
        const res = await this.prisma.place.findMany({
          where: {
            OR: [
              { place_name: { contains: keyword } },
              { province: { contains: keyword } },
              { country: { contains: keyword } },
              { image: { contains: keyword } },
            ],
          },
          skip: (+pageIndex - 1) * pageSize,
          take: +pageSize * (pageIndex - 1),
        });
        return {
          message: 'Get all places pagination successfully',
          content: res,
        };
      } catch (error) {
        return error.message;
      }
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async getPlaceByPlaceId(placeId: number): Promise<any> {
    try {
      const res = await this.prisma.place.findFirst({
        where: { id: +placeId },
      });
      return {
        message: 'Get place successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async updatePlace(body: UpdatePlaceDto, placeId: number): Promise<any> {
    try {
      const res = await this.prisma.place.update({
        where: { id: +placeId },
        data: body,
      });
      return {
        message: 'Update place successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async deletePlace(placeId: number): Promise<any> {
    try {
      const res = await this.prisma.place.delete({
        where: { id: +placeId },
      });
      return {
        message: 'Delete place successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async uploadImage(placeId: number, file: Express.Multer.File): Promise<any> {
    try {
      const res = await this.prisma.place.findFirst({
        where: { id: +placeId },
      });
      res.image = file.filename;
      const result = await this.prisma.place.update({
        where: { id: +placeId },
        data: res,
      });
      return {
        message: 'Upload image place successfully',
        content: res,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
