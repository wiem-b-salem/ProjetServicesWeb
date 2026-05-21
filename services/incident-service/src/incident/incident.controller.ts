import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { IncidentService } from './incident.service';

@Controller('incidents')
export class IncidentController {
  constructor(private incidentService: IncidentService) {}

  @Post()
  create(
    @Body() body: {
      type: string;
      description: string;
      latitude: number;
      longitude: number;
      reported_by?: number;
    },
  ) {
    return this.incidentService.createIncident(
      body.type,
      body.description,
      body.latitude,
      body.longitude,
      body.reported_by,
    );
  }

  @Get()
  findAll() {
    return this.incidentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentService.getById(+id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.incidentService.updateStatus(+id, body.status);
  }
}