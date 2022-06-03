"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListAllScaleUseCase = /** @class */ (function () {
    function ListAllScaleUseCase(repository) {
        this.repository = repository;
    }
    ListAllScaleUseCase.prototype.execute = function () {
        return Promise.resolve(this.repository.findAll());
    };
    return ListAllScaleUseCase;
}());
exports.default = ListAllScaleUseCase;
