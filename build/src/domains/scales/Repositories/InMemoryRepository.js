"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateScaleException_1 = __importDefault(require("../Exceptions/CreateScaleException"));
var InMemoryScaleRepository = /** @class */ (function () {
    function InMemoryScaleRepository() {
    }
    InMemoryScaleRepository.prototype.create = function (scale) {
        var foundDate = InMemoryScaleRepository.mock.some(function (register) { return register.getDate === scale.getDate; });
        if (foundDate) {
            throw new CreateScaleException_1.default('Scale already exists');
        }
        InMemoryScaleRepository.mock.push(scale);
        return Promise.resolve(scale);
    };
    InMemoryScaleRepository.prototype.findAll = function () {
        return Promise.resolve(InMemoryScaleRepository.mock);
    };
    InMemoryScaleRepository.mock = [];
    return InMemoryScaleRepository;
}());
exports.default = InMemoryScaleRepository;
