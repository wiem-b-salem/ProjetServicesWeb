import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from './vehicle.service'; 
import {VehicleController} from './vehicle.controller';
import { Vehicle } from './vehicle.entity';
import { GpsPosition } from './gps-position.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle, GpsPosition])],
    controllers: [VehicleController],
    providers : [VehicleService],
})
export class VehicleModule{}
