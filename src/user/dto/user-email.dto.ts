import {IsEmail} from "class-validator";
export class UserEmailDto {
    @IsEmail({message: "Correo electrónico inválido"})
  email: string;
}