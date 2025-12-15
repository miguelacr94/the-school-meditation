import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
} from "class-validator";

export class CreateGuidedMeditationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsString()
  category: string;

  @IsString()
  audioUrl: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  plays?: number;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
