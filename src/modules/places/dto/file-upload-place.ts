import { ApiProperty } from '@nestjs/swagger';

export class FileUploadPlaceDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
