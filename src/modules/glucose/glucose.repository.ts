import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { GlucoseEntity } from './glucose.entity';

@EntityRepository(GlucoseEntity)
export class GlucoseRepository extends Repository<GlucoseEntity> {}
