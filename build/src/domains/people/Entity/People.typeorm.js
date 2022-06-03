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
var typeorm_1 = require("typeorm");
var Instrument_typeorm_1 = __importDefault(require("../../instruments/Entity/Instrument.typeorm"));
var PeopleTypeORM = /** @class */ (function () {
    function PeopleTypeORM() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], PeopleTypeORM.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PeopleTypeORM.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PeopleTypeORM.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], PeopleTypeORM.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], PeopleTypeORM.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], PeopleTypeORM.prototype, "isMinister", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Instrument_typeorm_1.default; }),
        (0, typeorm_1.JoinTable)({ name: 'people_instruments' }),
        __metadata("design:type", Array)
    ], PeopleTypeORM.prototype, "instruments", void 0);
    PeopleTypeORM = __decorate([
        (0, typeorm_1.Entity)({ name: 'people' })
    ], PeopleTypeORM);
    return PeopleTypeORM;
}());
exports.default = PeopleTypeORM;
