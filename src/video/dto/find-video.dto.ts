import {
  IsOptional,
  IsMongoId,
  IsBooleanString,
  IsInt,
  Min,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

export class FindVideoQueryDto {
  @IsOptional()
  @IsMongoId()
  id?: string;

  @IsOptional()
  @IsBooleanString()
  isPremium?: string;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @Transform(({ value }: { value: any }) =>
    value ? parseInt(String(value), 10) : undefined,
  )
  @IsInt()
  @Min(0)
  views?: number;

  @IsOptional()
  @Transform(({ value }: { value: any }) =>
    value ? parseInt(String(value), 10) : undefined,
  )
  @IsInt()
  @Min(0)
  position?: number;

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
