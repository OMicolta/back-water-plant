import { PartialType } from '@nestjs/mapped-types';
import { RestaurantDto } from './restaurant.dto';

export class RestaurantPatchDto extends PartialType(RestaurantDto) {}