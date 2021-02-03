import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QualityController } from './quality.controller';
import { QualityRepository } from './quality.repository';
import { QualityService } from './quality.service';

@Module({
  imports: [TypeOrmModule.forFeature([QualityRepository])],
  controllers: [QualityController],
  exports: [QualityService],
  providers: [QualityService],
})
export class QualityModule {}
