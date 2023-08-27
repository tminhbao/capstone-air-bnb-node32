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
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiHeaders,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(200)
  @Get()
  getAllComments(): Promise<any> {
    return this.commentsService.getAllComments();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateCommentDto })
  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  createNewComment(@Body() body: CreateCommentDto, @Req() req): Promise<any> {
    return this.commentsService.createNewComment(req.user.user, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateCommentDto })
  @ApiParam({ name: 'commentId' })
  @ApiBearerAuth()
  @HttpCode(201)
  @Put('/:commentId')
  updateComment(
    @Body() body: UpdateCommentDto,
    @Req() req,
    @Param('commentId') commentId: string | number,
  ): Promise<any> {
    return this.commentsService.updateComment(req.user.user, body, commentId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiParam({ name: 'commentId' })
  @Delete('/:commentId')
  deleteComment(@Param('commentId') commentId: string | number): Promise<any> {
    return this.commentsService.deletComment(commentId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'roomId' })
  @ApiBearerAuth()
  @HttpCode(201)
  @Get('/get-comments-by-room-id/:roomId')
  getCommentsByRoomId(@Param('roomId') roomId: string | number): Promise<any> {
    return this.commentsService.getCommentsByRoomId(roomId);
  }
}
