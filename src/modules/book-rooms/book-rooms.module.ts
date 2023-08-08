import { Module } from '@nestjs/common';
import { BookRoomsService } from './book-rooms.service';
import { BookRoomsController } from './book-rooms.controller';

@Module({
  controllers: [BookRoomsController],
  providers: [BookRoomsService],
})
export class BookRoomsModule {}
