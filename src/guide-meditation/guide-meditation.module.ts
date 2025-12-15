import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GuidedMeditationController } from "./guide-meditation.controller";
import { GuidedMeditationService } from "./guide-meditation.service";
import {
  GuidedMeditation,
  GuidedMeditationSchema,
} from "./schemas/guided-meditation.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GuidedMeditation.name,
        schema: GuidedMeditationSchema,
        collection: "guides",
      },
    ]),
  ],
  controllers: [GuidedMeditationController],
  providers: [GuidedMeditationService],
  exports: [GuidedMeditationService],
})
export class GuidedMeditationModule {}
