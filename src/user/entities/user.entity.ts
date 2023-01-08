import { Column, Entity, ObjectIdColumn,ObjectID } from "typeorm";

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectID;
  
  @ObjectIdColumn() 
  document: string;
  
  @Column()
  typeDocument: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

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

}
