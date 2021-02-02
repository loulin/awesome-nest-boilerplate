'use strict';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserDto } from '../user/dto/UserDto';
import { UserRo } from '../user/dto/UserRo';
import { UsersPageDto } from '../user/dto/UsersPageDto';
import { UsersPageOptionsDto } from '../user/dto/UsersPageOptionsDto';
import { UserService } from '../user/user.service';

@Controller('api/admin/users')
@ApiTags('管理后台')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class UserController {
  constructor(private _userService: UserService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: '用户列表' })
  @ApiResponse({ status: HttpStatus.OK, type: UsersPageDto })
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<UsersPageDto> {
    return this._userService.getUsers(pageOptionsDto);
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: '新增用户' })
  @ApiResponse({ status: HttpStatus.OK, type: UserRo })
  async create(@Body() body: UserDto): Promise<UserRo> {
    const user = await this._userService.findOne({
      username: body.username,
    });

    if (user) {
      throw new BadRequestException('用户名已存在');
    }

    const createdUser = await this._userService.createUser(body);

    return createdUser.toDto();
  }
}
