import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { WardEntity } from './ward.entity';

@EntityRepository(WardEntity)
export class WardRepository extends Repository<WardEntity> {}
