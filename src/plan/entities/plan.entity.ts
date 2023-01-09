import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("plans")
export class Plan{
    @ObjectIdColumn() id: ObjectID;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    isActive: boolean = true;

    @Column()
    createdAt: Date = new Date();

    @Column()
    quantity: number;

    @Column()
    percentDesc: number;

    @Column()
    idRestaurant: string;
}