"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListAllPeopleUseCase = /** @class */ (function () {
    function ListAllPeopleUseCase(repository) {
        this.repository = repository;
    }
    ListAllPeopleUseCase.prototype.execute = function () {
        return Promise.resolve(this.repository.findAll());
    };
    return ListAllPeopleUseCase;
}());
exports.default = ListAllPeopleUseCase;
