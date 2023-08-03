import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}
  prisma = new PrismaClient();
  async uploadAvatar(file: Express.Multer.File, token): Promise<any> {
    try {
      // const res = await this.jwtService.verify(token);
      // return res;
      let user = await this.prisma.user.findFirst({ where: { id: 1 } });
      // user.avatar = file.filename;
      await this.prisma.user.update({
        where: { id: user.id },
        data: user,
      });
      return {
        message: 'Upload avatar successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
