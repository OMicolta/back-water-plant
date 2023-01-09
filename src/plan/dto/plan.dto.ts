import { IsInt, IsNumber, IsString } from "class-validator";
import { ObjectID } from "typeorm";

export class PlanDto{
    @IsString({
        message: 'El nombre se ha de indicar'
    })
    name: string;

    @IsString({
        message: 'La descrición se ha de indicar'
    })
    description: string;

    @IsInt({ message: "La cantidad debe ser un número entero"})
    quantity: number;

    @IsNumber({maxDecimalPlaces: 8})
    percentDesc: number;
    @IsString({
        message: 'La categoria se debe indicar'
      })
    idRestaurant: string;
}