'use strict';

import { AbstractEntity } from '../abstract.entity';

export class AbstractRo {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity: AbstractEntity, options?) {
    this.id = entity?.id;

    if (options?.timestamp) {
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
  }
}
