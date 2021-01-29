'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDto {
  @ApiProperty()
  hospital: string;

  @ApiProperty()
  department: string;

  constructor(data: { hospital: string; department: string }) {
    this.hospital = data.hospital;
    this.department = data.department;
  }
}
