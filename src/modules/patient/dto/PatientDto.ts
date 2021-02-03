import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { SexType } from '../../../common/constants/sex-type';

export class PatientDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsNumber()
  @ApiProperty()
  sex: SexType;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  wardId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bed: string;
}
