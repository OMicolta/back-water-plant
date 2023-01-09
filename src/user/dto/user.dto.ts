import { IsInt, IsString, IsDate , MinLength,IsEmail} from "class-validator";
import { Type } from 'class-transformer';
export class UserDto {
  @IsString({
    message: 'El número de documento se debe indicar'
  })
  @MinLength(10, {
    message: 'El documento de identidad debe tener mínimo 10 caracteres',
  })
  document: string;

  @IsString({
    message: 'El tipo de documetno se ha de indicar'
  })
  @MinLength(2, {
    message: 'El tipo de documento debe tener mínimo 2',
  })
  typeDocument: string;

  @IsString({
    message: 'El nombre se ha de indicar'
  })
  name: string;

  @IsString({
    message: 'El apellido se ha de indicar'
  })
  lastName: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString({
    message: 'El departamento se ha de indicar'
  })
  @MinLength(4, {
    message: 'El departamento debe tener mínimo 4 caracteres',
  })
  department: string;

  @MinLength(4, {
    message: 'la ciudad debe tener mínimo 4 caracteres',
  })
  @IsString({
    message: 'La Ciudad se ha de indicar'
  })
  city: string;

  @MinLength(4, {
    message: 'la dirección debe tener mínimo 4 caracteres',
  })
  @IsString({
    message: 'La direccion se ha de indicar'
  })
  adress: string;

  @MinLength(0, {
    message: 'la dirección debe tener mínimo 4 caracteres',
  })
  descAdress: string;

  @IsString({
    message: 'El correo se ha de indicar'
  })
  @IsEmail({message: "Correo electrónico inválido"})
  email: string;

  @IsString({
    message: 'El número de célular se ha de indicar'
  })
  cellphone: string;

  isActive: boolean = true;
}

