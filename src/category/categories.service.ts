import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { MongoRepository, ObjectID } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from './dto/category.dto';
import { CategoryPatchDto } from './dto/category-patch.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
  ) { }

  getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getId(id: ObjectID): Promise<Category> {
    let ctg = await this.categoryRepository.findOneById(id);
    if (ctg) {
      return ctg;
    }
    throw new NotFoundException('No puedo encontrar ese Usero');
  }

  async insert(body: CategoryDto): Promise<Category> {
    const userToSave = this.categoryRepository.create(body);
    await this.categoryRepository.save(userToSave);
    return userToSave;
  }

  async update(id: ObjectID, body: CategoryDto | CategoryPatchDto): Promise<Category> {
    let inputUser = {
      id,
      ...body
    }
    const User = await this.categoryRepository.preload(inputUser);
    if (User) {
      return this.categoryRepository.save(User);
    }
    throw new NotFoundException(`No he encontrado el Usero con id ${id}`);
  }

  async delete(id: ObjectID) {
    const User = await this.categoryRepository.findOneById(id)
    if (User) {
      return this.categoryRepository.remove(User);
    }
    throw new NotFoundException(`No he encontrado el Usero con id ${id}`);
  }
}
