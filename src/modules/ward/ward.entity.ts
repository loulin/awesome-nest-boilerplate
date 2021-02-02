import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { WardRo } from './dto/WardRo';

@Entity({ name: 'wards' })
export class WardEntity extends AbstractEntity<WardRo> {
  @Column({ unique: true, nullable: false })
  name: string;

  dtoClass = WardRo;
}
