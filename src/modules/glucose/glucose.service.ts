import { Injectable } from '@nestjs/common';
import * as BBPromise from 'bluebird';
import * as _ from 'lodash';
import { FindConditions } from 'typeorm';

import { GlucoseItemDto } from './dto/GlucoseItemDto';
import { GlucosesPageDto } from './dto/GlucosesPageDto';
import { GlucosesPageOptionsDto } from './dto/GlucosesPageOptionsDto';
import { GlucoseEntity } from './glucose.entity';
import { GlucoseRepository } from './glucose.repository';

@Injectable()
export class GlucoseService {
  constructor(public readonly glucoseRepository: GlucoseRepository) {}

  findOne(findData: FindConditions<GlucoseEntity>): Promise<GlucoseEntity> {
    return this.glucoseRepository.findOne(findData);
  }

  async find(
    findData: FindConditions<GlucoseEntity>,
    pageOptionsDto: GlucosesPageOptionsDto,
  ): Promise<GlucosesPageDto> {
    const queryBuilder = this.glucoseRepository
      .createQueryBuilder('glucose')
      .where(findData);
    const [glucoses, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new GlucosesPageDto(glucoses.toDtos(), pageMetaDto);
  }

  async save(userId: number, item: GlucoseItemDto) {
    let glucose = await this.glucoseRepository.findOne(
      _.pick(item, ['patientId', 'date']),
    );

    if (glucose) {
      glucose.value = item.value;
    } else {
      glucose = this.glucoseRepository.create(item);
      glucose.createdBy = userId;
    }

    glucose.updatedBy = userId;

    return this.glucoseRepository.save(glucose);
  }

  add(userId: number, items: GlucoseItemDto[]): Promise<GlucoseEntity[]> {
    return BBPromise.map(items, async (item) => this.save(userId, item));
  }
}
