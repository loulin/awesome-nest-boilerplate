'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractRo } from '../../../common/dto/AbstractRo';
import { WardRo } from '../../ward/dto/WardRo';
import { UserEntity } from '../user.entity';

export class UserRo extends AbstractRo {
  @ApiPropertyOptional({ default: 1 })
  role: number;

  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional()
  ward: WardRo;

  constructor(user: UserEntity) {
    super(user);
    this.role = user.role;
    this.username = user.username;
    this.ward = user.ward?.toDto();
  }
}
