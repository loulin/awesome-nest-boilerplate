import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { WardEntity } from '../ward/ward.entity';
import { UserRo } from './dto/UserRo';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserRo> {
  @Column({ default: 1 })
  role: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => WardEntity, (ward) => ward.id, { onDelete: 'SET NULL' })
  ward: WardEntity;

  @Column({ nullable: true })
  wardId: number;

  dtoClass = UserRo;
}
