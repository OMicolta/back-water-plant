import {  IsString , MinLength,IsEmail} from "class-validator";
import { ObjectID } from "typeorm";
export class RestaurantDto {
    
    @IsString({
        message: 'El número de documento se debe indicar'
      })
      @MinLength(10, {
        message: 'El documento de identidad debe tener mínimo 10 caracteres',
      })
      document: string;
    
      @IsString({
        message: 'El nombre del restaurante se ha de indicar'
      })
      name: string;
    

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
      
      @IsString({
        message: 'La categoria se debe indicar'
      })
      idCategory: ObjectID;

      isActive: boolean = true;
}