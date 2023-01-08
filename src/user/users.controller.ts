import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  Param, 
  Patch, 
  Post, 
  Put, 
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserPatchDto } from './dto/user-patch.dto';
import { ObjectID } from 'typeorm';
import { SendgridService } from 'src/sendgrid/sendgrid.service'; // add this

@Controller('Users')
export class UsersController {

  constructor(private readonly UsersService: UsersService) { }

  @Get()
  getAll(): Promise<User[]> {
    return this.UsersService.getAll();
  }

  @Get(':id')
  find(@Param('id') id: ObjectID) {
    return this.UsersService.getId(id);
  }

  @Get('/document/:document')
  findByDocument(@Param('document') document: number) {
    return this.UsersService.getDocument(document.toString());
  }

  @Post()
  async create(@Body() body: UserDto): Promise<User> {
    return this.UsersService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: ObjectID, 
    @Body() body: UserDto
  ): Promise<User> {
    return this.UsersService.update(id, body);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: ObjectID,
    @Body() body: UserPatchDto
  ) {
    return this.UsersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: ObjectID) {
    return this.UsersService.delete(id);
  }
}
