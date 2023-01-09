import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('users_emails')
export class UserEmail {
    @ObjectIdColumn() id: ObjectID;
    
    @Column()
    email: string;

    @Column()
    createdAt: Date = new Date();
}