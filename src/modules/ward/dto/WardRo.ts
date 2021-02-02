'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { AbstractRo } from '../../../common/dto/AbstractRo';
import { WardEntity } from '../ward.entity';

export class WardRo extends AbstractRo {
  @ApiProperty()
  name: string;

  constructor(ward: WardEntity) {
    super(ward);
    this.name = ward.name;
  }
}
