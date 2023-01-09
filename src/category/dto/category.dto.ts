import {  IsString } from "class-validator";
export class CategoryDto {
    
    @IsString({
        message: 'El nombre se ha de indicar'
    })
    name: string;

    @IsString({
        message: 'La descrición se ha de indicar'
    })
    description: string;
    
   
}