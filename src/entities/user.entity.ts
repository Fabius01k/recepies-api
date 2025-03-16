import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    dietType: string;

    @Column({ nullable: true })
    foodRestrictions: string;

    @Column({ nullable: true })
    allergy: string;
}