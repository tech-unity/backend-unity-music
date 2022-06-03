"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateInstrumentException_1 = __importDefault(require("../Exceptions/CreateInstrumentException"));
var InMemoryInstrumentRepository = /** @class */ (function () {
    function InMemoryInstrumentRepository() {
    }
    InMemoryInstrumentRepository.prototype.create = function (instrument) {
        var foundId = InMemoryInstrumentRepository.mock.some(function (register) { return register.id === instrument.getId; });
        if (foundId) {
            throw new CreateInstrumentException_1.default('Instrument already exists');
        }
        InMemoryInstrumentRepository.mock.push(instrument);
        return Promise.resolve(instrument);
    };
    InMemoryInstrumentRepository.prototype.findAll = function () {
        return Promise.resolve(InMemoryInstrumentRepository.mock);
    };
    InMemoryInstrumentRepository.prototype.findById = function (id) {
        return Promise.resolve(InMemoryInstrumentRepository.mock.find(function (element) { return element.id === id; }));
    };
    InMemoryInstrumentRepository.mock = [];
    return InMemoryInstrumentRepository;
}());
exports.default = InMemoryInstrumentRepository;
