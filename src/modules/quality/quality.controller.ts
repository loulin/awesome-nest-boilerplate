'use strict';

import {
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
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { QualitiesPageOptionsDto } from './dto/QualitiesPageOptionsDto';
import { QualitiesPageRo } from './dto/QualitiesPageRo';
import { QualityDto } from './dto/QualityDto';
import { QualityRo } from './dto/QualityRo';
import { QualityService } from './quality.service';

@Controller('api/qualities')
@ApiTags('质控')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class QualityController {
  constructor(private _qualityService: QualityService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '质控数据列表' })
  @ApiResponse({ status: HttpStatus.OK, type: QualitiesPageRo })
  getInHospitalQualities(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: QualitiesPageOptionsDto,
  ): Promise<QualitiesPageRo> {
    return this._qualityService.find(pageOptionsDto);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '同步单次质控数据' })
  @ApiResponse({ status: HttpStatus.OK, type: QualityRo })
  async create(@AuthUser() user, @Body() item: QualityDto): Promise<QualityRo> {
    const quality = await this._qualityService.create(user.id, item);

    return quality.toDto();
  }

  @Post('/sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '批量同步质控数据' })
  @ApiBody({ type: [QualityDto] })
  @ApiResponse({ status: HttpStatus.OK, type: [QualityRo] })
  async sync(
    @Body() items: QualityDto[],
    @AuthUser() user,
  ): Promise<QualityRo[]> {
    const qualities = await this._qualityService.batchCreate(user.id, items);

    return qualities.toDtos();
  }
}
