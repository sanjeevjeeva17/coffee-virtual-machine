import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float', { default: 0 })
  soy: number;

  @Column('float', { default: 0 })
  almond: number;

  @Column('float', { default: 0 })
  whole: number;

  @Column('float', { default: 0 })
  skimmed: number;

  @Column('float', { default: 0 })
  sugar: number;

  @Column('float', { default: 0 }) // Set default or make nullable
  coffeeBean: number;
}
