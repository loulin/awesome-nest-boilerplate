import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { PatientModule } from '../patient/patient.module';
import { GlucoseController } from './glucose.controller';
import { GlucoseRepository } from './glucose.repository';
import { GlucoseService } from './glucose.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PatientModule),
    TypeOrmModule.forFeature([GlucoseRepository]),
  ],
  controllers: [GlucoseController],
  exports: [GlucoseService],
  providers: [GlucoseService],
})
export class GlucoseModule {}
