import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { TrackService } from './track.service';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/createCommentDto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'picture', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() data: CreateTrackDto) {
    const { audio, picture } = files;
    return this.trackService.create(data, audio[0], picture[0]);
  }

  @Get()
  getAll(@Query('count') count, @Query('offset') offset) {
    return this.trackService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query) {
    return this.trackService.search(query);
  }

  @Get('/:id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comments')
  addComment(@Body() data: CreateCommentDto) {
    return this.trackService.addComment(data);
  }

  @Get('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
