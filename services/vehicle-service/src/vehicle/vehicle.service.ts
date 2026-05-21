import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { GpsPosition } from './gps-position.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
    @InjectRepository(GpsPosition)
    private gpsRepo: Repository<GpsPosition>,
  ) {}

  async addVehicle(plate: string, type: string, owner_id: number) {
    const vehicle = this.vehicleRepo.create({ plate, type, owner_id });
    return this.vehicleRepo.save(vehicle);
  }

  async getAllVehicles() {
    return this.vehicleRepo.find();
  }

  async getVehicleById(id: number) {
    const vehicle = await this.vehicleRepo.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async addGpsPosition(vehicle_id: number, latitude: number, longitude: number) {
    await this.getVehicleById(vehicle_id); // check vehicle exists
    const pos = this.gpsRepo.create({ vehicle_id, latitude, longitude });
    return this.gpsRepo.save(pos);
  }

  async getHistory(vehicle_id: number) {
    return this.gpsRepo.find({
      where: { vehicle_id },
      order: { recorded_at: 'DESC' },
    });
  }
}