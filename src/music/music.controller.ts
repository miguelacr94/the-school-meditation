import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { MusicService } from "./music.service";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { FindMusicQueryDto } from "./dto/find-music.dto";
import { Music } from "./schemas/music.schema";

@Controller("musics")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  create(@Body() dto: CreateMusicDto): Promise<Music> {
    return this.musicService.create(dto);
  }

  @Get()
  findAll(@Query() query: FindMusicQueryDto): Promise<Music[]> {
    return this.musicService.findAll(
      query.id,
      query.categories,
      query.isPremium ? query.isPremium === "true" : undefined,
      query.active ? query.active === "true" : undefined,
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Music> {
    return this.musicService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateMusicDto): Promise<Music> {
    return this.musicService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.musicService.remove(id);
  }

  @Post(":id/play")
  incrementPlays(@Param("id") id: string): Promise<Music> {
    return this.musicService.incrementPlays(id);
  }
}
