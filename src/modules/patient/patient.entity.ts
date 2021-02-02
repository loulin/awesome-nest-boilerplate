import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { SexType } from '../../common/constants/sex-type';
import { WardEntity } from '../ward/ward.entity';
import { PatientDto } from './dto/PatientDto';

@Entity({ name: 'patients' })
export class PatientEntity extends AbstractEntity<PatientDto> {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, default: 0 })
  sex: SexType;

  @Column({ comment: '床位', nullable: true })
  bed: string;

  @Column({ comment: '是否住院', nullable: true, default: true })
  inHospital: boolean;

  @ManyToOne(() => WardEntity, (ward) => ward.id, { onDelete: 'SET NULL' })
  ward: WardEntity;

  @Column({ nullable: true })
  wardId: number;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;

  dtoClass = PatientDto;
}
