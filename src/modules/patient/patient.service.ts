import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { PatientsPageDto } from './dto/PatientsPageDto';
import { PatientsPageOptionsDto } from './dto/PatientsPageOptionsDto';
import { PatientEntity } from './patient.entity';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(public readonly patientRepository: PatientRepository) {}

  findOne(id, options?): Promise<PatientEntity> {
    return this.patientRepository.findOne(id, options);
  }

  findByIds(ids, options): Promise<PatientEntity[]> {
    return this.patientRepository.findByIds(ids, options);
  }

  async find(
    findData: FindConditions<PatientEntity>,
    pageOptionsDto: PatientsPageOptionsDto,
  ): Promise<PatientsPageDto> {
    const queryBuilder = this.patientRepository
      .createQueryBuilder('patient')
      .where(findData);
    const [patients, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new PatientsPageDto(patients.toDtos(), pageMetaDto);
  }
}
