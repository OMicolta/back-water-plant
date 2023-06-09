import { IsString } from "class-validator";
export class CategoryDto {

    @IsString({
        message: 'La humedad en tierra es requerida'
    })
    soilMoisture: number;

    @IsString({
        message: 'La temperatura es requerida'
    })
    temperature: number;

    @IsString({
        message: 'La humedad en aire es requerida'
    })
    airHumidity: number;
}