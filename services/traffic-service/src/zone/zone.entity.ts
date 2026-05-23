import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('zones', { schema: 'traffic' })
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float', { default: 0 })
  density: number;

  @Column({ default: 'Faible' })
  level: string;

  @UpdateDateColumn()
  updated_at: Date;
}