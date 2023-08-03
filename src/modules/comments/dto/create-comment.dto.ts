import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    example: '1',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: '1',
  })
  room_id: string;

  @ApiProperty({
    type: String,
    example: '1',
  })
  user_id: string;

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
    type: String,
    example: '5',
  })
  stars: string;
}
