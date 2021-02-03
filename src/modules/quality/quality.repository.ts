import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { QualityEntity } from './quality.entity';

@EntityRepository(QualityEntity)
export class QualityRepository extends Repository<QualityEntity> {}
