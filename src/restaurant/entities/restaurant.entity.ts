import { Category } from "src/category/entities/category.entity";
import { Plan } from "src/plan/entities/plan.entity";
import { Column, Entity, ObjectIdColumn,ObjectID } from "typeorm";

@Entity('restaurants')
export class Restaurant {
    @ObjectIdColumn() id: ObjectID;
  
    @Column()
    document: string;
    
    @Column()
    name: string;
  
    @Column()
    department: string;
  
    @Column()
    city: string;
  
    @Column()
    adress: string;
  
    @Column()
    descAdress: string;
  
    @Column()
    email: string;
  
    @Column()
    cellphone: string;
  
    @Column()
    isActive: boolean = true;
  
    @Column()
    createdAt: Date = new Date();

    @Column(() => Category)
    category: Category
    
}