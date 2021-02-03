import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PatientModule } from '../patient/patient.module';
import { UserModule } from '../user/user.module';
import { WardModule } from '../ward/ward.module';
import { PatientController } from './patient.controller';
import { UserController } from './user.controller';
import { WardController } from './ward.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => WardModule),
    forwardRef(() => UserModule),
    forwardRef(() => PatientModule),
  ],
  controllers: [UserController, WardController, PatientController],
})
export class AdminModule {}
