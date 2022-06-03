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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppDataSource_1 = require("../../../infrastructure/AppDataSource");
var Instrument_1 = __importDefault(require("../../instruments/Entity/Instrument"));
var Instrument_typeorm_1 = __importDefault(require("../../instruments/Entity/Instrument.typeorm"));
var InstrumentNotFoundException_1 = __importDefault(require("../../instruments/Exceptions/InstrumentNotFoundException"));
var People_1 = __importDefault(require("../../people/Entity/People"));
var People_typeorm_1 = __importDefault(require("../../people/Entity/People.typeorm"));
var PeopleNotFoundException_1 = __importDefault(require("../../people/Exceptions/PeopleNotFoundException"));
var Scale_1 = __importDefault(require("../Entity/Scale"));
var Scale_typeorm_1 = __importStar(require("../Entity/Scale.typeorm"));
var CreateScaleException_1 = __importDefault(require("../Exceptions/CreateScaleException"));
var PostgresScaleRepository = /** @class */ (function () {
    function PostgresScaleRepository() {
        this.repository = AppDataSource_1.AppDataSource.getRepository(Scale_typeorm_1.default);
        this.peopleRepository = AppDataSource_1.AppDataSource.getRepository(People_typeorm_1.default);
        this.instrumentRepository = AppDataSource_1.AppDataSource.getRepository(Instrument_typeorm_1.default);
        this.bandRepository = AppDataSource_1.AppDataSource.getRepository(Scale_typeorm_1.BandTypeORM);
    }
    PostgresScaleRepository.prototype.create = function (scale) {
        return __awaiter(this, void 0, void 0, function () {
            var foundDate, typeORMEntity;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOneBy({ date: new Date(scale.getDate).toLocaleDateString() })];
                    case 1:
                        foundDate = _a.sent();
                        if (foundDate) {
                            throw new CreateScaleException_1.default("A scale to date [ ".concat(new Date(scale.getDate).toLocaleDateString(), " ] already exists"));
                        }
                        return [4 /*yield*/, this.toTypeORM(scale)];
                    case 2:
                        typeORMEntity = _a.sent();
                        // Garantindo que tudo ocorra numa transaction
                        return [2 /*return*/, this.repository.manager.transaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                var _i, _a, band, scaleTypeORM;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _i = 0, _a = typeORMEntity.band;
                                            _b.label = 1;
                                        case 1:
                                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                                            band = _a[_i];
                                            return [4 /*yield*/, this.bandRepository.save(band)];
                                        case 2:
                                            _b.sent();
                                            _b.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [4 /*yield*/, this.repository.save(typeORMEntity)];
                                        case 5:
                                            scaleTypeORM = _b.sent();
                                            return [2 /*return*/, this.toDomainModel(scaleTypeORM)];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    PostgresScaleRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.find({
                            relations: {
                                band: {
                                    instrument: true,
                                    person: true,
                                },
                                singers: true,
                            },
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.map(function (scale) { return _this.toDomainModel(scale); })];
                }
            });
        });
    };
    PostgresScaleRepository.prototype.toTypeORM = function (scale) {
        return __awaiter(this, void 0, void 0, function () {
            var scaleTypeORM, _i, _a, singer, person, _b, _c, band, instrument, person, bandTypeORM;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        scaleTypeORM = new Scale_typeorm_1.default();
                        scaleTypeORM.id = scale.getId;
                        scaleTypeORM.date = new Date(scale.getDate).toLocaleDateString();
                        scaleTypeORM.band = [];
                        scaleTypeORM.singers = [];
                        _i = 0, _a = scale.getSingers;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        singer = _a[_i];
                        return [4 /*yield*/, this.peopleRepository.findOneBy({
                                id: singer.getId,
                            })];
                    case 2:
                        person = _d.sent();
                        if (!person) {
                            throw new PeopleNotFoundException_1.default("Person of id ".concat(singer.getId, " could not be found"));
                        }
                        scaleTypeORM.singers.push(person);
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _b = 0, _c = scale.getBand;
                        _d.label = 5;
                    case 5:
                        if (!(_b < _c.length)) return [3 /*break*/, 9];
                        band = _c[_b];
                        return [4 /*yield*/, this.instrumentRepository.findOneBy({
                                id: band.instrument.getId,
                            })];
                    case 6:
                        instrument = _d.sent();
                        if (!instrument) {
                            throw new InstrumentNotFoundException_1.default("Instrument of id ".concat(band.instrument.getId, " could not be found"));
                        }
                        return [4 /*yield*/, this.peopleRepository.findOneBy({
                                id: band.person.getId,
                            })];
                    case 7:
                        person = _d.sent();
                        if (!person) {
                            throw new PeopleNotFoundException_1.default("Person of id ".concat(band.person.getId, " could not be found"));
                        }
                        bandTypeORM = new Scale_typeorm_1.BandTypeORM();
                        bandTypeORM.instrument = instrument;
                        bandTypeORM.person = person;
                        scaleTypeORM.band.push(bandTypeORM);
                        _d.label = 8;
                    case 8:
                        _b++;
                        return [3 /*break*/, 5];
                    case 9: return [2 /*return*/, scaleTypeORM];
                }
            });
        });
    };
    PostgresScaleRepository.prototype.toDomainModel = function (scaleTypeORM) {
        return new Scale_1.default({
            id: scaleTypeORM.id,
            date: new Date(scaleTypeORM.date),
            band: scaleTypeORM.band
                ? scaleTypeORM.band.map(function (band) {
                    var _a;
                    return {
                        instrument: new Instrument_1.default({
                            id: band.instrument.id,
                            name: band.instrument.name,
                        }),
                        person: new People_1.default({
                            id: band.person.id,
                            name: band.person.name,
                            email: band.person.email,
                            phone: band.person.phone,
                            instruments: (_a = band.person.instruments) === null || _a === void 0 ? void 0 : _a.map(function (instrument) {
                                return new Instrument_1.default({
                                    id: instrument.id,
                                    name: instrument.name,
                                });
                            }),
                            gender: band.person.gender,
                            isMinister: band.person.isMinister,
                        }),
                    };
                })
                : [],
            singers: scaleTypeORM.singers
                ? scaleTypeORM.singers.map(function (person) {
                    var _a;
                    return new People_1.default({
                        id: person.id,
                        name: person.name,
                        email: person.email,
                        phone: person.phone,
                        instruments: (_a = person.instruments) === null || _a === void 0 ? void 0 : _a.map(function (instrument) {
                            return new Instrument_1.default({
                                id: instrument.id,
                                name: instrument.name,
                            });
                        }),
                        gender: person.gender,
                        isMinister: person.isMinister,
                    });
                })
                : [],
        });
    };
    return PostgresScaleRepository;
}());
exports.default = PostgresScaleRepository;
