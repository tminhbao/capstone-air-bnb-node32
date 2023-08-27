import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Headers,
  HttpCode,
  UseGuards,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FileUploadDto } from './dto/file-upload.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers(): Promise<any> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Post()
  createNewUser(@Body() body: CreateUserDto) {
    return this.usersService.createNewUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Delete()
  deleteUser(@Query('userId') userId: number) {
    return this.usersService.deleteUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @Get('pagination')
  getUserPagination(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return this.usersService.getUserPagination(pageSize, pageIndex, keyword);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('/:userId')
  getUserDetailByUserId(@Param('userId') userId: number) {
    return this.usersService.getUserDetailByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Put('/:userId')
  updateUserInfo(@Body() body, @Param('userId') userId: number) {
    return this.usersService.updateUserInfo(body, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('search/:fullName')
  searchUserByName(@Param('fullName') fullName: string) {
    return this.usersService.searchUserByName(fullName);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  @ApiBody({ description: 'Choose Image', type: FileUploadDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + `/public/img/users`,
        filename: (req, file, cb) => {
          cb(null, new Date().getTime() + file.originalname);
        },
      }),
    }),
  )
  @Post('upload-avatar')
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ): Promise<any> {
    return this.usersService.uploadAvatar(file, req.user.user);
  }
}
