import { Repository } from 'typeorm';
import { Zone } from './zone.entity';
export declare class ZoneService {
    private zoneRepo;
    constructor(zoneRepo: Repository<Zone>);
    createZone(name: string): Promise<Zone>;
    getAllZones(): Promise<Zone[]>;
    getCongestedZones(): Promise<Zone[]>;
    updateDensity(id: number, density: number): Promise<Zone>;
}
