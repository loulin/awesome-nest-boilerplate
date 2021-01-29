'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { WardEntity } from '../ward.entity';

export class WardDto extends AbstractDto {
  @ApiProperty()
  name: string;

  constructor(ward: WardEntity) {
    super(ward);
    this.name = ward.name;
  }
}
