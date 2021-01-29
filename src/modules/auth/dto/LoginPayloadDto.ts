'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../user/dto/UserDto';
import { OrganizationDto } from './OrganizationDto';
import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
  @ApiProperty({ type: OrganizationDto })
  organization: OrganizationDto;
  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserDto, token: TokenPayloadDto) {
    this.user = user;
    this.organization = { hospital: '和杰人民医院', department: '内分泌科' };
    this.token = token;
  }
}
