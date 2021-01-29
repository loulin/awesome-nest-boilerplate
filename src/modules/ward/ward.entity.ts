import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { WardDto } from './dto/WardDto';

@Entity({ name: 'wards' })
export class WardEntity extends AbstractEntity<WardDto> {
  @Column({ unique: true, nullable: false })
  name: string;

  dtoClass = WardDto;
}
