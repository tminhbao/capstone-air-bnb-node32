import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    type: String,
    example: 'Nguyễn Văn A',
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
    example: '0912384928',
  })
  phone: string;

  @ApiProperty({
    type: Date,
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
    example: 'USER',
  })
  role: string;
}
