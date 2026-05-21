import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './incident.entity';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private incidentRepo: Repository<Incident>,
  ) {}

  async createIncident(
    type: string,
    description: string,
    latitude: number,
    longitude: number,
    reported_by?: number,
  ) {
    const incident = this.incidentRepo.create({
      type,
      description,
      latitude,
      longitude,
      reported_by,
    });
    return this.incidentRepo.save(incident);
  }

  async getAll() {
    return this.incidentRepo.find({ order: { created_at: 'DESC' } });
  }

  async getById(id: number) {
    const incident = await this.incidentRepo.findOne({ where: { id } });
    if (!incident) throw new NotFoundException('Incident not found');
    return incident;
  }

  async updateStatus(id: number, status: string) {
    const incident = await this.getById(id);
    incident.status = status;
    return this.incidentRepo.save(incident);
  }
}