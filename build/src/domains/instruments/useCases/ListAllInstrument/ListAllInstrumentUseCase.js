"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListAllInstrumentUseCase = /** @class */ (function () {
    function ListAllInstrumentUseCase(repository) {
        this.repository = repository;
    }
    ListAllInstrumentUseCase.prototype.execute = function () {
        return Promise.resolve(this.repository.findAll());
    };
    return ListAllInstrumentUseCase;
}());
exports.default = ListAllInstrumentUseCase;
