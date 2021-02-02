import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { WardRo } from './dto/WardRo';
import { WardsPageDto } from './dto/WardsPageDto';
import { WardsPageOptionsDto } from './dto/WardsPageOptionsDto';
import { WardEntity } from './ward.entity';
import { WardRepository } from './ward.repository';

@Injectable()
export class WardService {
  constructor(public readonly wardRepository: WardRepository) {}

  findOne(findData: FindConditions<WardEntity>): Promise<WardEntity> {
    return this.wardRepository.findOne(findData);
  }

  async find(pageOptionsDto: WardsPageOptionsDto): Promise<WardsPageDto> {
    const queryBuilder = this.wardRepository.createQueryBuilder('ward');
    const [wards, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return new WardsPageDto(wards.toDtos(), pageMetaDto);
  }

  async findAll(): Promise<WardRo[]> {
    const wards = await this.wardRepository.find();

    return wards.toDtos();
  }
}
