'use strict';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
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
import * as _ from 'lodash';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { PatientService } from '../patient/patient.service';
import { GlucoseDto } from './dto/GlucoseDto';
import { GlucoseItemDto } from './dto/GlucoseItemDto';
import { GlucoseRo } from './dto/GlucoseRo';
import { GlucosesPageDto } from './dto/GlucosesPageDto';
import { GlucosesPageOptionsDto } from './dto/GlucosesPageOptionsDto';
import { GlucoseService } from './glucose.service';

@Controller('api')
@ApiTags('患者血糖')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class GlucoseController {
  constructor(
    private _glucoseService: GlucoseService,
    private _patientService: PatientService,
  ) {}

  @Get('/patients/:patientId/glucoses')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '患者血糖列表',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get glucoses list',
    type: GlucosesPageDto,
  })
  async getInHospitalGlucoses(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: GlucosesPageOptionsDto,
    @Param('patientId') patientId: number,
    @AuthUser() user,
  ): Promise<GlucosesPageDto> {
    const patient = await this._patientService.findOne(patientId, {
      select: ['wardId'],
    });

    if (!patient || patient.wardId !== user.wardId) {
      throw new NotFoundException();
    }

    return this._glucoseService.find({ patientId }, pageOptionsDto);
  }

  @Post('/patients/:patientId/glucoses')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '同步单次测量血糖',
    description: '单个患者的一次测量数据，可用于测量后立即同步',
  })
  @ApiResponse({ status: HttpStatus.OK, type: GlucoseRo })
  async create(
    @AuthUser() user,
    @Param('patientId') patientId: number,
    @Body() item: GlucoseDto,
  ): Promise<GlucoseRo> {
    const patient = await this._patientService.findOne(patientId, {
      select: ['wardId'],
    });

    if (!patient || patient.wardId !== user.wardId) {
      throw new NotFoundException(); // 权限检查
    }

    const glucose = await this._glucoseService.save({ ...item, patientId });

    return glucose.toDto();
  }

  @Post('/glucoses/sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '同步血糖',
    description: '多个患者多次测量同时上传',
  })
  @ApiBody({ type: [GlucoseItemDto] })
  @ApiResponse({ status: HttpStatus.OK, type: [GlucoseRo] })
  async sync(
    @Body() items: GlucoseItemDto[],
    @AuthUser() user,
  ): Promise<GlucoseRo[]> {
    if (!_.every(items, (item) => !!item.patientId)) {
      throw new NotFoundException('patientId of some items are missing');
    }

    const patientIds = _.map(items, 'patientId');
    const patients = await this._patientService.findByIds(patientIds, {
      select: ['wardId'],
    });

    if (_.some(patients, (patient) => patient.wardId !== user.wardId)) {
      throw new NotFoundException(); // 权限检查
    }

    const glucoses = await this._glucoseService.add(items);

    return glucoses.toDtos();
  }
}
