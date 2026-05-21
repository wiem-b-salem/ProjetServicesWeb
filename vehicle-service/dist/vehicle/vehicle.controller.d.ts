import { VehicleService } from './vehicle.service';
export declare class VehicleController {
    private vehicleService;
    constructor(vehicleService: VehicleService);
    create(body: {
        plate: string;
        type: string;
        owner_id: number;
    }): Promise<import("./vehicle.entity").Vehicle>;
    findAll(): Promise<import("./vehicle.entity").Vehicle[]>;
    findOne(id: string): Promise<import("./vehicle.entity").Vehicle>;
    addGps(id: string, body: {
        latitude: number;
        longitude: number;
    }): Promise<import("./gps-position.entity").GpsPosition>;
    getHistory(id: string): Promise<import("./gps-position.entity").GpsPosition[]>;
}
