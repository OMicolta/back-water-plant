import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { CategoryModule } from './category/categories.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { RestaurantsModule } from './restaurant/restaurants.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [UsersModule,
    CategoryModule,
    SendgridModule, 
    RestaurantsModule, 
    PlanModule,
    ConfigModule.forRoot({
    expandVariables: true,
  }), TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.MONGODB_CONNECTION_STRING,
    database: process.env.MONGODB_DATABASE,
    retryDelay: 3000,
    autoLoadEntities: true,
    synchronize: true,
    ssl: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
