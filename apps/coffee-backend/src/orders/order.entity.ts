import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coffeeType: string;

  @Column()
  size: string;

  @Column({ default: 'None' }) // Sets a default value for the sugar column
  sugar: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ default: 'No Milk' }) // Sets a default value for the milk column
  milk: string;
}
