import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileUploadDto } from '../users/dto/file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Rooms')
@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @HttpCode(200)
  @Get()
  getAllRooms(): Promise<any> {
    return this.roomsService.getAllRooms();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateRoomDto })
  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  createNewRoom(@Body() body: CreateRoomDto, @Req() req): Promise<any> {
    return this.roomsService.createNewRoom(body, req.user.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'placeId' })
  @ApiBearerAuth()
  @HttpCode(200)
  @Get('/get-room-by-place-id')
  getRoomByPlaceId(@Param('placeId') placeId: number): Promise<any> {
    return this.roomsService.getRoomByPlaceId(placeId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @Get('/:roomId')
  getRoomByRoomId(@Param('roomId') roomId: number) {
    return this.roomsService.getRoomByRoomId(roomId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @Get('pagination')
  getRoomsPagination(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return this.roomsService.getRoomsPagination(pageIndex, pageSize, keyword);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @Put('/:roomId')
  updateRoom(
    @Body() body: UpdateRoomDto,
    @Param('roomId') roomId: number,
    @Req() req: any,
  ) {
    return this.roomsService.updateRoom(body, roomId, req.user.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @Delete('/:roomId')
  deleteRoom(@Param('roomId') roomId: number) {
    return this.roomsService.deleteRoom(roomId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ description: 'Choose Image', type: FileUploadDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + `/public/img/rooms`,
        filename: (req, file, cb) => {
          cb(null, new Date().getTime() + file.originalname);
        },
      }),
    }),
  )
  @HttpCode(200)
  @Post('/upload-image-room')
  uploadImageRoom(
    @Query('roomId') roomId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.roomsService.uploadImageRoom(roomId, file);
  }
}
