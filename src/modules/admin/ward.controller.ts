'use strict';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { WardRo } from '../ward/dto/WardRo';
import { WardsPageDto } from '../ward/dto/WardsPageDto';
import { WardsPageOptionsDto } from '../ward/dto/WardsPageOptionsDto';
import { WardService } from '../ward/ward.service';

@Controller('api/admin/wards')
@ApiTags('管理后台')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class WardController {
  constructor(private _wardService: WardService) {}

  @Get('')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'all', required: false })
  @ApiOperation({ summary: '病区列表', description: '同步自院内病区' })
  @ApiResponse({ status: HttpStatus.OK, type: WardsPageDto })
  getWards(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: WardsPageOptionsDto,
    @Query('all') isAll?: boolean,
  ): Promise<WardsPageDto | WardRo[]> {
    return isAll
      ? this._wardService.findAll()
      : this._wardService.find(pageOptionsDto);
  }
}
