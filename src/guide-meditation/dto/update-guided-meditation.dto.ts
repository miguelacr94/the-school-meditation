import { PartialType } from "@nestjs/mapped-types";
import { CreateGuidedMeditationDto } from "./create-guided-meditation.dto";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateGuidedMeditationDto extends PartialType(
  CreateGuidedMeditationDto,
) {}
