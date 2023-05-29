import { IsString } from "class-validator";
export class CategoryDto {

    @IsString({
        message: 'El nombre se ha de indicar'
    })
    soilMoisture: number;

    @IsString({
        message: 'La descrición se ha de indicar'
    })
    temperature: number;

    @IsString({
        message: 'La descrición se ha de indicar'
    })
    airHumidity: number;
}