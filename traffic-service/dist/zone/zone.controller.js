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
exports.ZoneController = void 0;
const common_1 = require("@nestjs/common");
const zone_service_1 = require("./zone.service");
let ZoneController = class ZoneController {
    zoneService;
    constructor(zoneService) {
        this.zoneService = zoneService;
    }
    create(body) {
        return this.zoneService.createZone(body.name);
    }
    findAll() {
        return this.zoneService.getAllZones();
    }
    getCongested() {
        return this.zoneService.getCongestedZones();
    }
    updateDensity(id, body) {
        return this.zoneService.updateDensity(+id, body.density);
    }
};
exports.ZoneController = ZoneController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('congested'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "getCongested", null);
__decorate([
    (0, common_1.Patch)(':id/density'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ZoneController.prototype, "updateDensity", null);
exports.ZoneController = ZoneController = __decorate([
    (0, common_1.Controller)('zones'),
    __metadata("design:paramtypes", [zone_service_1.ZoneService])
], ZoneController);
//# sourceMappingURL=zone.controller.js.map