import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileUploadPlaceDto } from './dto/file-upload-place';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Places')
@Controller('api/places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}
  @HttpCode(200)
  @Get()
  getAllPlaces(): Promise<any> {
    return this.placesService.getAllPlaces();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreatePlaceDto })
  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  createNewPlace(@Body() body: CreatePlaceDto): Promise<any> {
    return this.placesService.createNewPlace(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @Get('pagination')
  getAllPlacesPagination(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
  ): Promise<any> {
    return this.placesService.getAllPlacesPagination(pageIndex, pageSize);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @Get('/:placeId')
  getPlaceByPlaceId(@Param('placeId') placeId: number): Promise<any> {
    return this.placesService.getPlaceByPlaceId(placeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @Put('/:placeId')
  updatePlace(
    @Body() body: UpdatePlaceDto,
    @Param('placeId') placeId: number,
  ): Promise<any> {
    return this.placesService.updatePlace(body, placeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @Delete('/:placeId')
  deletePlace(@Param('placeId') placeId: number): Promise<any> {
    return this.placesService.deletePlace(placeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ description: 'Choose Image', type: FileUploadPlaceDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + `/public/img/places`,
        filename: (req, file, cb) => {
          cb(null, new Date().getTime() + file.originalname);
        },
      }),
    }),
  )
  @HttpCode(200)
  @Post('/upload-image-place')
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('placeId') placeId: number,
  ): Promise<any> {
    return this.placesService.uploadImage(placeId, file);
  }
}
