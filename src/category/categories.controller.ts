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
import { Category } from './entities/category.entity';
import { CategoryService } from './categories.service';
import { ObjectID } from 'typeorm';
import { CategoryPatchDto } from './dto/category-patch.dto';
import { CategoryDto} from './dto/category.dto';

@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: ObjectID) {
    return this.categoryService.getId(id);
  }

  @Get('/name/:name')
  findByDocument(@Param('name') name: string) {
    return this.categoryService.getName(document.toString());
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
}
