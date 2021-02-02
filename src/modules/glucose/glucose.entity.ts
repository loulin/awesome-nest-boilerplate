import { Column, Entity, ManyToOne, Unique } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { PatientEntity } from '../patient/patient.entity';
import { GlucoseRo } from './dto/GlucoseRo';

@Entity({ name: 'glucoses' })
@Unique(['patientId', 'date'])
export class GlucoseEntity extends AbstractEntity<GlucoseRo> {
  @Column({ type: 'float' })
  value: number;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @ManyToOne(() => PatientEntity, (patient) => patient.id, {
    onDelete: 'CASCADE',
  })
  patient: PatientEntity;

  @Column()
  patientId: number;

  dtoClass = GlucoseRo;
}
