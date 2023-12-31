import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id?: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  room_id: number;

  @ApiProperty({
    type: Date,
    format: 'YYYY-MM-DD',
    example: '2001-01-01',
  })
  date_comment: string;

  @ApiProperty({
    type: String,
    example: 'Phòng đẹp',
  })
  content: string;

  @ApiProperty({
    type: Number,
    example: 5,
  })
  stars: number;
}
