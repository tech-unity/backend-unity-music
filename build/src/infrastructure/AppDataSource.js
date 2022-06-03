"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Instrument_typeorm_1 = __importDefault(require("../domains/instruments/Entity/Instrument.typeorm"));
var People_typeorm_1 = __importDefault(require("../domains/people/Entity/People.typeorm"));
var Scale_typeorm_1 = __importStar(require("../domains/scales/Entity/Scale.typeorm"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
    type: 'postgres',
    database: 'postgres',
    synchronize: true,
    // logging: true,
    entities: [Instrument_typeorm_1.default, People_typeorm_1.default, Scale_typeorm_1.default, Scale_typeorm_1.BandTypeORM],
    subscribers: [],
    migrations: [],
});
exports.AppDataSource.initialize()
    .then()
    .catch(function (err) { return console.error(err); });
