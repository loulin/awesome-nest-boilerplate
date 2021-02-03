'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { SexType } from '../../../common/constants/sex-type';
import { AbstractRo } from '../../../common/dto/AbstractRo';
import { PatientEntity } from '../patient.entity';

export class PatientRo extends AbstractRo {
  @ApiProperty()
  name: string;

  @ApiProperty()
  sex: SexType;

  @ApiPropertyOptional()
  bed: string;

  constructor(patient: PatientEntity) {
    super(patient);
    this.name = patient.name;
    this.sex = patient.sex;
    this.bed = patient.bed;
  }
}
