import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurants.controller';
import { CategoryModule } from 'src/category/categories.module';
import { Restaurant } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant.service';
import { PlanModule } from 'src/plan/plan.module';


@Module({
  imports: [TypeOrmModule.forFeature([Restaurant]),CategoryModule,PlanModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService]
})
export class RestaurantsModule {}
