import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
  @ApiProperty({
    type: String,
    example: 'Phù Cát',
  })
  place_name: string;

  @ApiProperty({
    type: String,
    example: 'Bình Định',
  })
  province: string;

  @ApiProperty({
    type: String,
    example: 'Việt Nam',
  })
  country: string;

  @ApiProperty({
    type: String,
  })
  image: string;
}
