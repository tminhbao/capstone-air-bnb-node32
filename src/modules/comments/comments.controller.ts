import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(200)
  @Get()
  getAllComments(): Promise<any> {
    return this.commentsService.getAllComments();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateCommentDto })
  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  createNewComment(@Body() body: CreateCommentDto, @Req() req) {
    return this.commentsService.createNewComment(req.user, body);
  }
}
