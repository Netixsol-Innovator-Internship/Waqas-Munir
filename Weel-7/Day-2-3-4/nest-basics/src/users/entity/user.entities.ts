import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
