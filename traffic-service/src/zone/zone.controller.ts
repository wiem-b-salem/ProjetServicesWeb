import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ZoneService } from './zone.service';

@Controller('zones')
export class ZoneController {
  constructor(private zoneService: ZoneService) {}

  @Post()
  create(@Body() body: { name: string }) {
    return this.zoneService.createZone(body.name);
  }

  @Get()
  findAll() {
    return this.zoneService.getAllZones();
  }

  @Get('congested')
  getCongested() {
    return this.zoneService.getCongestedZones();
  }

  @Patch(':id/density')
  updateDensity(
    @Param('id') id: string,
    @Body() body: { density: number },
  ) {
    return this.zoneService.updateDensity(+id, body.density);
  }
}