"use strict";
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
var Scale_1 = __importDefault(require("../../Entity/Scale"));
var CreateScaleException_1 = __importDefault(require("../../Exceptions/CreateScaleException"));
var CreateScaleUseCase = /** @class */ (function () {
    function CreateScaleUseCase(scaleRepository, peopleRepository, instrumentRepository) {
        this.scaleRepository = scaleRepository;
        this.peopleRepository = peopleRepository;
        this.instrumentRepository = instrumentRepository;
    }
    CreateScaleUseCase.prototype.execute = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var band, index, instrument, person, singers, index, person, scaleProps, scale;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!props)
                            throw new CreateScaleException_1.default('Invalid properties');
                        if (!Array.isArray(props.band)) {
                            throw new CreateScaleException_1.default("Band is required and it must be an array. [{instrument: string, person: string}]");
                        }
                        if (!Array.isArray(props.singers)) {
                            throw new CreateScaleException_1.default("Singers are required and it must be an array.");
                        }
                        band = [];
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < props.band.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.instrumentRepository.findById(props.band[index].instrument)];
                    case 2:
                        instrument = _a.sent();
                        if (!instrument) {
                            throw new CreateScaleException_1.default("Instrument with id: ".concat(props.band[index].instrument, " does not exist"));
                        }
                        return [4 /*yield*/, this.peopleRepository.findById(props.band[index].person)];
                    case 3:
                        person = _a.sent();
                        if (!person) {
                            throw new CreateScaleException_1.default("Person with id: ".concat(props.band[index].person, " does not exist"));
                        }
                        band.push({ instrument: instrument, person: person });
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 1];
                    case 5:
                        singers = [];
                        index = 0;
                        _a.label = 6;
                    case 6:
                        if (!(index < props.singers.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.peopleRepository.findById(props.singers[index])];
                    case 7:
                        person = _a.sent();
                        if (!person) {
                            throw new CreateScaleException_1.default("Person with id: ".concat(props.singers[index], " does not exist"));
                        }
                        singers.push(person);
                        _a.label = 8;
                    case 8:
                        index++;
                        return [3 /*break*/, 6];
                    case 9:
                        scaleProps = {
                            id: props.id,
                            date: props.date,
                            band: band,
                            singers: singers,
                        };
                        scale = new Scale_1.default(scaleProps);
                        return [4 /*yield*/, this.scaleRepository.create(scale)];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, {
                                id: scale.getId,
                                date: scale.getDate,
                                band: scale.getBand,
                                singers: scale.getSingers
                            }];
                }
            });
        });
    };
    return CreateScaleUseCase;
}());
exports.default = CreateScaleUseCase;
