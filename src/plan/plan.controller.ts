import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { PlanService } from './plan.service';
import { Plan } from './entities/plan.entity';
import { ObjectID } from 'typeorm';
import { PlanDto } from './dto/plan.dto';
import { PlanPatchDto } from './dto/plan-patch.dto';

@Controller('plans')
export class PlanController {
    constructor(private readonly planService: PlanService) {}

  @Get()
  getAll(): Promise<Plan[]> {
    return this.planService.getAll();
  }

  @Get("byrestaurants/:id")
  async getAllPlansByIdRestaurants(@Param('id') id: ObjectID): Promise<Plan[]> {
    return await this.planService.getPlansByIdRestaurant(id.toString());
  }

  @Get(':id')
  find(@Param('id') id: ObjectID) {
    return this.planService.getId(id);
  }

  @Get('/name/:name')
  findByDocument(@Param('name') name: string) {
    return this.planService.getName(document.toString());
  }

  @Post()
  async create(@Body() body: PlanDto): Promise<Plan> {
    return this.planService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectID, 
    @Body() body: PlanDto
  ): Promise<Plan> {
    return this.planService.update(id, body);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: ObjectID,
    @Body() body: PlanPatchDto
  ) {
    return this.planService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: ObjectID) {
    return this.planService.delete(id);
  }
}
