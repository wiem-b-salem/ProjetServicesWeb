import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('gps_positions', { schema: 'vehicle' })
export class GpsPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column()
  vehicle_id: number;

  @ManyToOne(() => Vehicle, vehicle => vehicle.positions)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @CreateDateColumn()
  recorded_at: Date;
}