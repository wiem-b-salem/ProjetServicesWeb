import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { GpsPosition } from './gps-position.entity';

@Entity('vehicles', { schema: 'vehicle' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plate: string;

  @Column()
  type: string;

  @Column()
  owner_id: number;

  @OneToMany(() => GpsPosition, pos => pos.vehicle)
  positions: GpsPosition[];

  @CreateDateColumn()
  created_at: Date;
}