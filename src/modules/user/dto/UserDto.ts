'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional({ default: 1 })
  role: number;

  @ApiPropertyOptional()
  username: string;

  constructor(user: UserEntity) {
    super(user);
    this.role = user.role;
    this.username = user.username;
  }
}
