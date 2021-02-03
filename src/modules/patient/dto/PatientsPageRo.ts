import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { PatientRo } from './PatientRo';

export class PatientsPageRo {
  @ApiProperty({
    type: PatientRo,
    isArray: true,
  })
  readonly data: PatientRo[];

  @ApiProperty()
  readonly meta: PageMetaDto = new PageMetaDto();

  constructor(data: PatientRo[], meta?: PageMetaDto) {
    this.data = data;

    if (meta) {
      this.meta = meta;
    }
  }
}
