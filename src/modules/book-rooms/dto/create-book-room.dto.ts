import { ApiProperty } from '@nestjs/swagger';

export class CreateBookRoomDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  room_id: number;

  @ApiProperty({
    type: Date,
    example: '2023-08-01',
  })
  arrival_date: string;

  @ApiProperty({
    type: Date,
    example: '2023-08-05',
  })
  departure_date: string;

  @ApiProperty({
    type: Number,
    example: 2,
  })
  numbers_of_guest: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  user_id: number;
}
