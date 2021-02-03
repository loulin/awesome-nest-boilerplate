import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
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
import { PatientDto } from '../patient/dto/PatientDto';
import { PatientRo } from '../patient/dto/PatientRo';
import { PatientService } from '../patient/patient.service';

@Controller('api/admin/patients')
@ApiTags('管理后台')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class PatientController {
  constructor(private _patientService: PatientService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: '新增患者（用于调试）' })
  @ApiResponse({ status: HttpStatus.OK, type: PatientRo })
  async create(@Body() body: PatientDto): Promise<PatientRo> {
    const patient = await this._patientService.create(body);

    return patient.toDto();
  }
}
