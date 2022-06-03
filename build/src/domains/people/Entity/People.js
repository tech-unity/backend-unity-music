"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUserException_1 = __importDefault(require("../Exceptions/CreateUserException"));
var crypto_1 = require("crypto");
var People = /** @class */ (function () {
    function People(props) {
        this.id = props.id || (0, crypto_1.randomUUID)();
        this.name = props.name;
        this.email = props.email;
        this.phone = props.phone;
        this.instruments = props.instruments || [];
        this.gender = props.gender;
        this.isMinister = props.isMinister;
        this.validate();
    }
    People.prototype.validate = function () {
        if (!this.id)
            throw new CreateUserException_1.default('Id is required');
        if (!this.name)
            throw new CreateUserException_1.default('Name is required');
        if (this.name.trim().length === 0)
            throw new CreateUserException_1.default('Name may not be empty');
        if (!this.email)
            throw new CreateUserException_1.default('Email is required');
        if (!this.gender)
            throw new CreateUserException_1.default('Gender is required');
        if (Boolean(this.isMinister) !== this.isMinister)
            throw new CreateUserException_1.default('IsMinister is required');
    };
    Object.defineProperty(People.prototype, "getId", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(People.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(People.prototype, "getEmail", {
        get: function () {
            return this.email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(People.prototype, "getPhone", {
        get: function () {
            return this.phone;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(People.prototype, "getInstruments", {
        get: function () {
            return this.instruments;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(People.prototype, "getGender", {
        get: function () {
            return this.gender;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(People.prototype, "getIsMinister", {
        get: function () {
            return this.isMinister;
        },
        enumerable: false,
        configurable: true
    });
    return People;
}());
exports.default = People;
