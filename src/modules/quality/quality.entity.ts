import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { QualityRo } from './dto/QualityRo';

@Entity({ name: 'qualities' })
export class QualityEntity extends AbstractEntity<QualityRo> {
  @Column({ nullable: true })
  paperBatchNumber: string;

  @Column({ nullable: true })
  liquidBatchNumber: string;

  @Column({ type: 'float', nullable: true })
  lRangeLow: number;
  @Column({ type: 'float', nullable: true })
  lRangeHigh: number;

  @Column({ type: 'float', nullable: true })
  hRangeLow: number;
  @Column({ type: 'float', nullable: true })
  hRangeHigh: number;

  @Column({ type: 'float' })
  lValue: number;
  @Column({ type: 'float' })
  hValue: number;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

  dtoClass = QualityRo;
}
