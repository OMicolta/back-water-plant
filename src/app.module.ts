/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/categories.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    CategoryModule,
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      retryDelay: 3000,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
