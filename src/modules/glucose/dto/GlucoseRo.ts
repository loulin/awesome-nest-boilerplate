'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { AbstractRo } from '../../../common/dto/AbstractRo';
import { GlucoseEntity } from '../glucose.entity';

export class GlucoseRo extends AbstractRo {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  value: number;

  constructor(glucose: GlucoseEntity) {
    super(glucose);
    this.date = glucose.date;
    this.value = glucose.value;
  }
}
