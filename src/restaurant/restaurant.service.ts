import { Injectable,NotFoundException } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { MongoRepository,ObjectID } from 'typeorm';
import { InjectRepository  } from '@nestjs/typeorm';
import { RestaurantDto } from './dto/restaurant.dto';
import { RestaurantPatchDto } from './dto/restaurant-patch.dto';
import { CategoryService } from 'src/category/categories.service';
import { PlanService } from 'src/plan/plan.service';



@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: MongoRepository<Restaurant>,
        private readonly categoryService: CategoryService
      ) {}
    
      getAll(): Promise<Restaurant[]> {
        return this.restaurantRepository.find();
      }
    
      async getId(id: ObjectID): Promise<Restaurant> {
        let rst = await this.restaurantRepository.findOneById(id)
        
        if(rst != null) {
          return rst;
        }
        throw new NotFoundException('No puedo encontrar el restaurante con el ID ' + id);
      }
    
      async getName(name: string): Promise<Restaurant> {
        let rst = await this.restaurantRepository.findBy({name : name
        })
        if(rst) {
          return rst[0];
        }
        throw new NotFoundException('No existe el restaurante con ese nombre');
      }
    
      async insert(body: RestaurantDto): Promise<Restaurant> {
        const rst = await this.restaurantRepository.findBy({name : body.name
        })
        
        if(rst.length != 0) {
          throw new NotFoundException(`No se puede guardar el restaurante con el nombre ${body.name} porque ya existe`);
        }
        const ctg = await this.categoryService.getId(body.idCategory);
        if(!ctg) {
            throw new NotFoundException(`No se puede guardar el restaurante con la categoria porque no existe`);
        }
        const restaurantToSave: Restaurant = this.restaurantRepository.create(body);
        restaurantToSave.category = ctg;
        await this.restaurantRepository.save(restaurantToSave);
        return restaurantToSave;
      }
    
      async update(id: ObjectID, body: RestaurantDto | RestaurantPatchDto): Promise<Restaurant> {
        let inputRestaurant = {
          id,
          ...body
        }
        const restaurant = await this.restaurantRepository.preload(inputRestaurant);
        if(restaurant) {
            const ctg = await this.categoryService.getId(body.idCategory);
            if(!ctg) {
                throw new NotFoundException(`No se puede guardar el restaurante con la categoria porque no existe`);
            }
            restaurant.category = ctg;
          return this.restaurantRepository.save(restaurant);
        }
        throw new NotFoundException(`No he encontrado el Usero con id ${id}`);
      }
    
      async delete(id: ObjectID) {
        const restaurant = await this.restaurantRepository.findOneById(id)
        if(restaurant) {
          return this.restaurantRepository.remove(restaurant);
        }
        throw new NotFoundException(`No he encontrado el Usero con id ${id}`);
      }

    
}
