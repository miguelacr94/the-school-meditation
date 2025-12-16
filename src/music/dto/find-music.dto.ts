import {
  IsOptional,
  IsMongoId,
  IsBooleanString,
  IsInt,
  Min,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

export class FindMusicQueryDto {
  @IsOptional()
  @IsMongoId()
  id?: string;

  @IsOptional()
  @IsMongoId()
  categories?: string;

  @IsOptional()
  @IsBooleanString()
  isPremium?: string;

  @IsOptional()
  @IsBooleanString()
  active?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }: { value: any }) =>
    value ? parseInt(String(value), 10) : undefined,
  )
  @IsInt()
  @Min(0)
  plays?: number;

  @IsOptional()
  @Transform(({ value }: { value: any }) =>
    value ? parseInt(String(value), 10) : undefined,
  )
  @IsInt()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsString()
  audioFilename?: string;

  @IsOptional()
  @IsString()
  imageFilename?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @Transform(({ value }: { value: any }) =>
    value ? parseInt(String(value), 10) : undefined,
  )
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }: { value: any }) =>
    value ? parseInt(String(value), 10) : undefined,
  )
  @IsInt()
  @Min(1)
  limit?: number;
}
