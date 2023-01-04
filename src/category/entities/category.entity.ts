import { Column, Entity, ObjectIdColumn,ObjectID } from "typeorm";

@Entity('categories')
export class Category {
    @ObjectIdColumn() id: ObjectID;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    isActive: boolean = true;

    @Column()
    createdAt: Date = new Date();
}