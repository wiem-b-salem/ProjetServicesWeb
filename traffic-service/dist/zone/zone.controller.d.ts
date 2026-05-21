import { ZoneService } from './zone.service';
export declare class ZoneController {
    private zoneService;
    constructor(zoneService: ZoneService);
    create(body: {
        name: string;
    }): Promise<import("./zone.entity").Zone>;
    findAll(): Promise<import("./zone.entity").Zone[]>;
    getCongested(): Promise<import("./zone.entity").Zone[]>;
    updateDensity(id: string, body: {
        density: number;
    }): Promise<import("./zone.entity").Zone>;
}
