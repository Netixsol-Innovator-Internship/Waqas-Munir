import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column()
  password: string;

  @Column({ nullable: true })
  otp_code: number;

  @Column({ nullable: true })
  otp_expiry_time: Date;

  @Column({ default: 'reader' })
  role: string;
}
