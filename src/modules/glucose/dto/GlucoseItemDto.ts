'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class GlucoseItemDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  value: number;

  @ApiProperty()
  patientId: number;
}
