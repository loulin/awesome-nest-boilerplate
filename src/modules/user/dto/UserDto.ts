'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  wardId: number;
}
