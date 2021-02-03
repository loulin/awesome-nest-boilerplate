import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class QualityDto {
  @ApiPropertyOptional({ title: '试纸批号' })
  @IsString()
  @IsOptional()
  paperBatchNumber: string;

  @ApiPropertyOptional({ title: '质控液批号' })
  @IsString()
  @IsOptional()
  liquidBatchNumber: string;

  @ApiPropertyOptional({ title: 'L范围(Low)' })
  @IsNumber()
  @IsOptional()
  lRangeLow: number;

  @ApiPropertyOptional({ title: 'L范围(High)' })
  @IsNumber()
  @IsOptional()
  lRangeHigh: number;

  @ApiPropertyOptional({ title: 'H范围(Low)' })
  @IsNumber()
  @IsOptional()
  hRangeLow: number;

  @ApiPropertyOptional({ title: 'H范围(High)' })
  @IsNumber()
  @IsOptional()
  hRangeHigh: number;

  @ApiProperty({ title: 'L值' })
  @IsNumber()
  lValue: number;

  @ApiProperty({ title: 'H值' })
  @IsNumber()
  hValue: number;

  @IsNotEmpty()
  @ApiProperty({ title: '质控时间' })
  @IsDate()
  @Type(() => Date)
  date: Date;
}
