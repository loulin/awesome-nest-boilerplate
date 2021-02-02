'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { UserRo } from '../../user/dto/UserRo';
import { OrganizationDto } from './OrganizationDto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserRo, description: '当前登录用户信息' })
  user: UserRo;
  @ApiProperty({ type: OrganizationDto })
  organization: OrganizationDto;
  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserRo, token: TokenPayloadDto) {
    this.user = user;
    this.organization = { hospital: '和杰人民医院', department: '内分泌科' };
    this.token = token;
  }
}
