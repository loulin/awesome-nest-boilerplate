import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { WardEntity } from '../ward/ward.entity';
import { UserDto } from './dto/UserDto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ default: 1 })
  role: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => WardEntity)
  ward: WardEntity;

  dtoClass = UserDto;
}
