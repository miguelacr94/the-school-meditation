import { IsOptional, IsMongoId, IsBooleanString } from "class-validator";

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
}
