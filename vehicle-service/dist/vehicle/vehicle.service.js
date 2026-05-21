"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("./vehicle.entity");
const gps_position_entity_1 = require("./gps-position.entity");
let VehicleService = class VehicleService {
    vehicleRepo;
    gpsRepo;
    constructor(vehicleRepo, gpsRepo) {
        this.vehicleRepo = vehicleRepo;
        this.gpsRepo = gpsRepo;
    }
    async addVehicle(plate, type, owner_id) {
        const vehicle = this.vehicleRepo.create({ plate, type, owner_id });
        return this.vehicleRepo.save(vehicle);
    }
    async getAllVehicles() {
        return this.vehicleRepo.find();
    }
    async getVehicleById(id) {
        const vehicle = await this.vehicleRepo.findOne({ where: { id } });
        if (!vehicle)
            throw new common_1.NotFoundException('Vehicle not found');
        return vehicle;
    }
    async addGpsPosition(vehicle_id, latitude, longitude) {
        await this.getVehicleById(vehicle_id);
        const pos = this.gpsRepo.create({ vehicle_id, latitude, longitude });
        return this.gpsRepo.save(pos);
    }
    async getHistory(vehicle_id) {
        return this.gpsRepo.find({
            where: { vehicle_id },
            order: { recorded_at: 'DESC' },
        });
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __param(1, (0, typeorm_1.InjectRepository)(gps_position_entity_1.GpsPosition)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map