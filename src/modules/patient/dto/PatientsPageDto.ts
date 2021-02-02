import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { PatientDto } from './PatientDto';

export class PatientsPageDto {
  @ApiProperty({
    type: PatientDto,
    isArray: true,
  })
  readonly data: PatientDto[];

  @ApiProperty()
  readonly meta: PageMetaDto = new PageMetaDto();

  constructor(data: PatientDto[], meta?: PageMetaDto) {
    this.data = data;

    if (meta) {
      this.meta = meta;
    }
  }
}
