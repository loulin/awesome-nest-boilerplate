import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { WardRo } from './WardRo';

export class WardsPageDto {
  @ApiProperty({
    type: WardRo,
    isArray: true,
  })
  readonly data: WardRo[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: WardRo[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
