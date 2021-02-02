'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class WardDto {
  @ApiProperty()
  name: string;
}
