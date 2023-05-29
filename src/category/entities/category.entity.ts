import { Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity('measurements')
export class Category {
    @ObjectIdColumn() id: ObjectID;

    @Column()
    soilMoisture: number;

    @Column()
    temperature: number;

    @Column()
    airHumidity: number;

    @Column()
    createdAt: Date = new Date();
}