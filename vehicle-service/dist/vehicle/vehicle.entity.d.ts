import { GpsPosition } from './gps-position.entity';
export declare class Vehicle {
    id: number;
    plate: string;
    type: string;
    owner_id: number;
    positions: GpsPosition[];
    created_at: Date;
}
