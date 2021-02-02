import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WardRepository } from './ward.repository';
import { WardService } from './ward.service';

@Module({
  imports: [TypeOrmModule.forFeature([WardRepository])],
  exports: [WardService],
  providers: [WardService],
})
export class WardModule {}
