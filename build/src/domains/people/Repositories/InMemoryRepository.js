"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUserException_1 = __importDefault(require("../Exceptions/CreateUserException"));
var InMemoryPeopleRepository = /** @class */ (function () {
    function InMemoryPeopleRepository() {
    }
    InMemoryPeopleRepository.prototype.create = function (person) {
        var foundId = InMemoryPeopleRepository.mock.some(function (register) { return register.id === person.getId; });
        if (foundId) {
            throw new CreateUserException_1.default('Person already exists');
        }
        InMemoryPeopleRepository.mock.push(person);
        return Promise.resolve(person);
    };
    InMemoryPeopleRepository.prototype.findAll = function () {
        return Promise.resolve(InMemoryPeopleRepository.mock);
    };
    InMemoryPeopleRepository.prototype.findById = function (id) {
        return Promise.resolve(InMemoryPeopleRepository.mock.find(function (element) { return element.id === id; }));
    };
    InMemoryPeopleRepository.mock = [];
    return InMemoryPeopleRepository;
}());
exports.default = InMemoryPeopleRepository;
