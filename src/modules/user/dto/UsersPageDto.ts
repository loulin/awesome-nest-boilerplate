import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { UserRo } from './UserRo';

export class UsersPageDto {
  @ApiProperty({
    type: UserRo,
    isArray: true,
  })
  readonly data: UserRo[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: UserRo[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
