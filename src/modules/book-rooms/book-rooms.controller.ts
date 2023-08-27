import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookRoomsService } from './book-rooms.service';
import { CreateBookRoomDto } from './dto/create-book-room.dto';
import { UpdateBookRoomDto } from './dto/update-book-room.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Book Rooms')
@Controller('api/book-rooms')
export class BookRoomsController {
  constructor(private readonly bookRoomsService: BookRoomsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAllBookRooms(): Promise<any> {
    return this.bookRoomsService.getAllBookRooms();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateBookRoomDto })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createNewBookRoom(@Body() body: CreateBookRoomDto, @Req() req: any) {
    return this.bookRoomsService.createNewBookRoom(body, req.user.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('/:bookRoomId')
  getBookRoomById(@Param('bookRoomId') bookRoomId: number) {
    return this.bookRoomsService.getBookRoomById(bookRoomId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Put('/:bookRoomId')
  updateBookRoom(
    @Body() body: UpdateBookRoomDto,
    @Param('bookRoomId') bookRoomId: number,
    @Req() req: any,
  ) {
    return this.bookRoomsService.updateBookRoom(
      body,
      bookRoomId,
      req.user.user,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Delete('/:bookRoomId')
  deleteBookRoom(@Param('bookRoomId') bookRoomId: number) {
    return this.bookRoomsService.deleteBookRoom(bookRoomId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('get-by-user/:userId')
  getBookRoomByUserId(@Param('userId') userId: number) {
    return this.bookRoomsService.getBookRoomByUserId(userId);
  }
}
