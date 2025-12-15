import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateMusicDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsArray()
  @IsMongoId({ each: true })
  categories: string[];

  @IsString()
  audioUrl: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  plays?: number = 0;

  @IsOptional()
  @IsBoolean()
  isPremium?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number = 0;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}
