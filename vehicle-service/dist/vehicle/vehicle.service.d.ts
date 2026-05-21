import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { GpsPosition } from './gps-position.entity';
export declare class VehicleService {
    private vehicleRepo;
    private gpsRepo;
    constructor(vehicleRepo: Repository<Vehicle>, gpsRepo: Repository<GpsPosition>);
    addVehicle(plate: string, type: string, owner_id: number): Promise<Vehicle>;
    getAllVehicles(): Promise<Vehicle[]>;
    getVehicleById(id: number): Promise<Vehicle>;
    addGpsPosition(vehicle_id: number, latitude: number, longitude: number): Promise<GpsPosition>;
    getHistory(vehicle_id: number): Promise<GpsPosition[]>;
}
