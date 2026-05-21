import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './zone.entity';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private zoneRepo: Repository<Zone>,
  ) {}

  async createZone(name: string) {
    const zone = this.zoneRepo.create({ name });
    return this.zoneRepo.save(zone);
  }

  async getAllZones() {
    return this.zoneRepo.find();
  }

  async getCongestedZones() {
    return this.zoneRepo.find({ where: { level: 'Élevé' } });
  }

  async updateDensity(id: number, density: number) {
    const zone = await this.zoneRepo.findOne({ where: { id } });
    if (!zone) throw new NotFoundException('Zone not found');

    // automatically classify based on density number
    let level = 'Faible';
    if (density > 50) level = 'Élevé';
    else if (density > 20) level = 'Moyen';

    zone.density = density;
    zone.level = level;
    return this.zoneRepo.save(zone);
  }
}