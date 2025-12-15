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
import { GuidedMeditationService } from "./guide-meditation.service";
import { CreateGuidedMeditationDto } from "./dto/create-guided-meditation.dto";
import { UpdateGuidedMeditationDto } from "./dto/update-guided-meditation.dto";
import { GuidedMeditation } from "./schemas/guided-meditation.schema";

@Controller("musics/guided-meditation")
export class GuidedMeditationController {
  constructor(private readonly meditationService: GuidedMeditationService) {}

  @Post()
  async create(
    @Body() createMeditationDto: CreateGuidedMeditationDto,
  ): Promise<GuidedMeditation> {
    return this.meditationService.create(createMeditationDto);
  }

  @Get()
  async findAll(
    @Query("category") category?: string,
    @Query("isPremium") isPremium?: boolean,
    @Query("active") active?: boolean,
  ): Promise<GuidedMeditation[]> {
    return this.meditationService.findAll(category, isPremium, active);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<GuidedMeditation> {
    return this.meditationService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMeditationDto: UpdateGuidedMeditationDto,
  ): Promise<GuidedMeditation> {
    return this.meditationService.update(id, updateMeditationDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.meditationService.remove(id);
  }

  @Post(":id/play")
  async incrementPlays(@Param("id") id: string): Promise<GuidedMeditation> {
    return this.meditationService.incrementPlays(id);
  }
}
