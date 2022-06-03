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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandTypeORM = void 0;
var typeorm_1 = require("typeorm");
var Instrument_typeorm_1 = __importDefault(require("../../instruments/Entity/Instrument.typeorm"));
var People_typeorm_1 = __importDefault(require("../../people/Entity/People.typeorm"));
var BandTypeORM = /** @class */ (function () {
    function BandTypeORM() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], BandTypeORM.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Instrument_typeorm_1.default; }),
        (0, typeorm_1.JoinTable)({ name: 'band_instrument' }),
        __metadata("design:type", Instrument_typeorm_1.default)
    ], BandTypeORM.prototype, "instrument", void 0);
    __decorate([
        (0, typeorm_1.JoinTable)({ name: 'band_person' }),
        (0, typeorm_1.ManyToMany)(function () { return People_typeorm_1.default; }),
        __metadata("design:type", People_typeorm_1.default)
    ], BandTypeORM.prototype, "person", void 0);
    BandTypeORM = __decorate([
        (0, typeorm_1.Entity)({ name: 'band' })
    ], BandTypeORM);
    return BandTypeORM;
}());
exports.BandTypeORM = BandTypeORM;
var ScaleTypeORM = /** @class */ (function () {
    function ScaleTypeORM() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], ScaleTypeORM.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true, type: 'date' }),
        __metadata("design:type", String)
    ], ScaleTypeORM.prototype, "date", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return BandTypeORM; }),
        (0, typeorm_1.JoinTable)({ name: 'scale_band' }),
        __metadata("design:type", Array)
    ], ScaleTypeORM.prototype, "band", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return People_typeorm_1.default; }),
        (0, typeorm_1.JoinTable)({ name: 'scale_singers' }),
        __metadata("design:type", Array)
    ], ScaleTypeORM.prototype, "singers", void 0);
    ScaleTypeORM = __decorate([
        (0, typeorm_1.Entity)({ name: 'scale' })
    ], ScaleTypeORM);
    return ScaleTypeORM;
}());
exports.default = ScaleTypeORM;
