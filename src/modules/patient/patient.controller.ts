'use strict';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

import { AuthUser } from '../../decorators/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { PatientDto } from './dto/PatientDto';
import { PatientsPageDto } from './dto/PatientsPageDto';
import { PatientsPageOptionsDto } from './dto/PatientsPageOptionsDto';
import { PatientService } from './patient.service';

@Controller('api/patients')
@ApiTags('病区患者')
@UseGuards(AuthGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class PatientController {
  constructor(private _patientService: PatientService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: number): Promise<PatientDto> {
    const patient = await this._patientService.findOne(id);

    return patient.toDto();
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '住院患者列表',
    description: '返回当前登录用户所在病区的患者',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get patients list',
    type: PatientsPageDto,
  })
  getInHospitalPatients(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PatientsPageOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<PatientsPageDto> {
    if (!user.ward) {
      return Promise.resolve(new PatientsPageDto([]));
    }

    return this._patientService.find({ wardId: user.ward?.id }, pageOptionsDto);
  }
}
