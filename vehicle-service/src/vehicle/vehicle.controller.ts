import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post()
  create(@Body() body: { plate: string; type: string; owner_id: number }) {
    return this.vehicleService.addVehicle(body.plate, body.type, body.owner_id);
  }

  @Get()
  findAll() {
    return this.vehicleService.getAllVehicles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(+id);
  }

  @Post(':id/gps')
  addGps(
    @Param('id') id: string,
    @Body() body: { latitude: number; longitude: number },
  ) {
    return this.vehicleService.addGpsPosition(+id, body.latitude, body.longitude);
  }

  @Get(':id/history')
  getHistory(@Param('id') id: string) {
    return this.vehicleService.getHistory(+id);
  }
}