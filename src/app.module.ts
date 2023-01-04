import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/categories.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';

@Module({
  imports: [UsersModule, CategoryModule,ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.MONGODB_CONNECTION_STRING,
    database: process.env.MONGODB_DATABASE,
    retryDelay: 3000,
    autoLoadEntities: true,
    synchronize: true,
    ssl: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  }), TypeOrmModule.forFeature([User])],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
