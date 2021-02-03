import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { QualityRo } from './QualityRo';

export class QualitiesPageRo {
  @ApiProperty({
    type: QualityRo,
    isArray: true,
  })
  readonly data: QualityRo[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: QualityRo[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
