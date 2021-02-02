import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { GlucoseRo } from './GlucoseRo';

export class GlucosesPageDto {
  @ApiProperty({
    type: GlucoseRo,
    isArray: true,
  })
  readonly data: GlucoseRo[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: GlucoseRo[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
