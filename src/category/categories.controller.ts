/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './categories.service';
import { ObjectID } from 'typeorm';
import { CategoryPatchDto } from './dto/category-patch.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('measurements')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: ObjectID) {
    return this.categoryService.getId(id);
  }

  @Post()
  async create(@Body() body: CategoryDto): Promise<Category> {
    return this.categoryService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectID,
    @Body() body: CategoryDto
  ): Promise<Category> {
    return this.categoryService.update(id, body);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: ObjectID,
    @Body() body: CategoryPatchDto
  ) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: ObjectID) {
    return this.categoryService.delete(id);
  }

  @Delete()
  @HttpCode(204)
  async removeAll() {
    try {
      await this.categoryService.deleteAll();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al eliminar los registros de la colección');
    }
  }

}
