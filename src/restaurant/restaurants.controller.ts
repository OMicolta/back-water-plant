import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    Param, 
    Patch, 
    Post, 
    Put
  } from '@nestjs/common';
  import { Restaurant } from './entities/restaurant.entity';
  import { RestaurantService } from './restaurant.service';
  import { ObjectID } from 'typeorm';
  import { RestaurantPatchDto } from './dto/restaurant-patch.dto';
  import { RestaurantDto} from './dto/restaurant.dto';

@Controller('restaurants')
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  getAll(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: ObjectID) {
    return this.restaurantService.getId(id);
  }

  @Get('/name/:name')
  findByDocument(@Param('name') name: string) {
    return this.restaurantService.getName(document.toString());
  }

  @Post()
  async create(@Body() body: RestaurantDto): Promise<Restaurant> {
    return this.restaurantService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectID, 
    @Body() body: RestaurantDto
  ): Promise<Restaurant> {
    return this.restaurantService.update(id, body);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: ObjectID,
    @Body() body: RestaurantPatchDto
  ) {
    return this.restaurantService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: ObjectID) {
    return this.restaurantService.delete(id);
  }
}
