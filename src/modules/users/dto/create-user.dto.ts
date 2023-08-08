import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'admin',
  })
  full_name: string;

  @ApiProperty({
    type: String,
    example: 'admin@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    example: '12345678',
  })
  pass_word: string;

  @ApiProperty({
    type: String,
    example: '0914000112',
  })
  phone: string;

  @ApiProperty({
    type: Date,
    // format: 'YYYY-MM-DD',
    example: '2001-01-01',
  })
  birth_day: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  gender: boolean;

  @ApiProperty({
    type: String,
    example: null,
  })
  avatar: string;

  @ApiProperty({
    type: String,
    example: 'ADMIN',
  })
  role: string;
}
