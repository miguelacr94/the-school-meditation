import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { FindVideoQueryDto } from "./dto/find-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { VideoPage, VideoItem } from "./interfaces/video.interface";

@Controller("videos")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  findAll(@Query() query: FindVideoQueryDto): Promise<VideoPage> {
    return this.videoService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<VideoItem | null> {
    return this.videoService.findOne(id);
  }

  @Post()
  create(@Body() createVideoDto: any): Promise<VideoItem> {
    return this.videoService.create(createVideoDto);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<VideoItem | null> {
    return this.videoService.update(id, updateVideoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<boolean> {
    return this.videoService.remove(id);
  }

  @Patch(":id/views")
  incrementViews(@Param("id") id: string): Promise<VideoItem | null> {
    return this.videoService.incrementViews(id);
  }
}
