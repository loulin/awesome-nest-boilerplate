import { Injectable } from '@nestjs/common';
import * as BBPromise from 'bluebird';
import { FindConditions } from 'typeorm';

import { QualitiesPageOptionsDto } from './dto/QualitiesPageOptionsDto';
import { QualitiesPageRo } from './dto/QualitiesPageRo';
import { QualityDto } from './dto/QualityDto';
import { QualityRo } from './dto/QualityRo';
import { QualityEntity } from './quality.entity';
import { QualityRepository } from './quality.repository';

@Injectable()
export class QualityService {
  constructor(public readonly qualityRepository: QualityRepository) {}

  findOne(findData: FindConditions<QualityEntity>): Promise<QualityEntity> {
    return this.qualityRepository.findOne(findData);
  }

  async find(
    pageOptionsDto: QualitiesPageOptionsDto,
  ): Promise<QualitiesPageRo> {
    const queryBuilder = this.qualityRepository.createQueryBuilder('quality');
    const [qualitys, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new QualitiesPageRo(qualitys.toDtos(), pageMetaDto);
  }

  async findAll(): Promise<QualityRo[]> {
    const qualitys = await this.qualityRepository.find();

    return qualitys.toDtos();
  }

  async create(userId: number, item: QualityDto): Promise<QualityEntity> {
    let quality = await this.qualityRepository.findOne({ date: item.date });

    if (quality) {
      Object.assign(quality, item);
    } else {
      quality = this.qualityRepository.create(item);
      quality.createdBy = userId;
    }

    quality.updatedBy = userId;

    return this.qualityRepository.save(quality);
  }

  batchCreate(userId: number, items: QualityDto[]): Promise<QualityEntity[]> {
    return BBPromise.map(items, (item) => this.create(userId, item));
  }
}
