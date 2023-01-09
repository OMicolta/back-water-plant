import { Injectable, NotFoundException } from '@nestjs/common';
import { Plan } from './entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID } from 'typeorm';
import { PlanDto } from './dto/plan.dto';
import { PlanPatchDto } from './dto/plan-patch.dto';

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(Plan)
        private readonly planRepository: MongoRepository<Plan>,
      ) {}
    
      getAll(): Promise<Plan[]> {
        return this.planRepository.find();
      }
    
      async getId(id: ObjectID): Promise<Plan> {
        let ctg = await this.planRepository.findOneById(id);
        if(ctg) {
          return ctg;
        }
        throw new NotFoundException('No puedo encontrar ese Usero');
      }
    
      async getName(name: string): Promise<Plan> {
        let ctg = await this.planRepository.findBy({name : name
        })
        if(ctg) {
          return ctg[0];
        }
        throw new NotFoundException('No existe el usuario con ese numero de documento');
      }
    
      async getPlansByIdRestaurant(id: string): Promise<Plan[]> {
        let plans = await this.planRepository.findBy({idRestaurant : id
        })
        if(plans) {
          return plans;
        }
        throw new NotFoundException('No existe planes en el restaurante');
      }
      async insert(body: PlanDto): Promise<Plan> {
        const user = await this.planRepository.findBy({name : body.name
        })
        console.log(user, user.length == 0)
        if(user.length != 0) {
          throw new NotFoundException(`No se puede guardar la categoria con el nombre ${body.name} porque ya existe`);
        }
        
        const userToSave = this.planRepository.create(body);
        await this.planRepository.save(userToSave);
        return userToSave;
      }
    
      async update(id: ObjectID, body: PlanDto | PlanPatchDto): Promise<Plan> {
        let inputUser = {
          id,
          ...body
        }
        const User = await this.planRepository.preload(inputUser);
        if(User) {
          return this.planRepository.save(User);
        }
        throw new NotFoundException(`No he encontrado el Usero con id ${id}`);
      }
    
      async delete(id: ObjectID) {
        const User = await this.planRepository.findOneById(id)
        if(User) {
          return this.planRepository.remove(User);
        }
        throw new NotFoundException(`No he encontrado el Usero con id ${id}`);
      }
}
