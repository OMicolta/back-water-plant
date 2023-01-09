import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SendgridModule } from 'src/sendgrid/sendgrid.module';
import { UserEmail } from './entities/user-email.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User,UserEmail]),SendgridModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
