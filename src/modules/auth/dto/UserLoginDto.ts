'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @ApiProperty({ description: '用户名' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: '密码' })
  readonly password: string;
}
