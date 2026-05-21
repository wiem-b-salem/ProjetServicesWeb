import { Vehicle } from './vehicle.entity';
export declare class GpsPosition {
    id: number;
    latitude: number;
    longitude: number;
    vehicle_id: number;
    vehicle: Vehicle;
    recorded_at: Date;
}
