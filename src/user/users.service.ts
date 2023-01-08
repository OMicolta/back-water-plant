import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserPatchDto } from './dto/user-patch.dto';
import { MongoRepository,ObjectID } from 'typeorm';
import { InjectRepository  } from '@nestjs/typeorm';
import { SendgridService } from 'src/sendgrid/sendgrid.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
    private readonly sendgridService: SendgridService
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getId(id: ObjectID): Promise<User> {
    let User = await this.usersRepository.findOneById(id);
    if(User) {
      return User;
    }
    throw new NotFoundException('No puedo encontrar ese Usero');
  }

  async getDocument(document: string): Promise<User> {
    let User = await this.usersRepository.findBy({document : document
    })
    console.log(User)
    if(User) {
      return User[0];
    }
    throw new NotFoundException('No existe el usuario con ese numero de documento');
  }

  async insert(body: UserDto): Promise<User> {
    const user = await this.usersRepository.findBy({document : body.document
    })
    if(user.length != 0) {
      throw new NotFoundException(`No se puede guardar el usuario con el documento ${body.document} porque ya existe`);
    }
    
    const userToSave = this.usersRepository.create(body);
    await this.usersRepository.save(userToSave);
    const mail = {
      to: body.email,
      subject: 'Hello from Lowit',
      from: 'teamlowit@gmail.com', // Fill it with your validated email on SendGrid account
      text: 'Welcome to Lowit',
      html: '<h1>Welcome to lowit</h1>',
    };
    await this.sendgridService.send(mail);
    return userToSave;
  }

  async update(id: ObjectID, body: UserDto | UserPatchDto): Promise<User> {
    let inputUser = {
      id,
      ...body
    }
    const User = await this.usersRepository.preload(inputUser);
    if(User) {
      return this.usersRepository.save(User);
    }
    throw new NotFoundException(`No he encontrado el Usero con id ${id}`);
  }

  async delete(id: ObjectID) {
    const User = await this.usersRepository.findOneById(id)
    if(User) {
      return this.usersRepository.remove(User);
    }
    throw new NotFoundException(`No he encontrado el Usero con id ${id}`);
  }

}
