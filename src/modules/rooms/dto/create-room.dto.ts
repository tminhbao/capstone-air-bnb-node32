import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    type: String,
    example: 'Room Name',
  })
  room_name: string;

  @ApiProperty({
    type: String,
    example: 1,
  })
  user_id: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  bedroom: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  bed: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  bathroom: number;

  @ApiProperty({
    type: String,
    example: 'description',
  })
  description: string;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  price: number;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  washing_machine: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  iron: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  television: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  air_conditioner: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  wifi: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  stove: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  parking: boolean;

  @ApiProperty({
    type: String,
    example: 'image name',
  })
  image: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  place_id: number;
}
