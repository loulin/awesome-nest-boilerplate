import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { WardModule } from '../ward/ward.module';
import { UserController } from './user.controller';
import { WardController } from './ward.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => WardModule),
    forwardRef(() => UserModule),
  ],
  controllers: [UserController, WardController],
})
export class AdminModule {}
