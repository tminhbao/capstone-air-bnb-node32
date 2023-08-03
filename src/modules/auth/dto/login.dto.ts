import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
}
