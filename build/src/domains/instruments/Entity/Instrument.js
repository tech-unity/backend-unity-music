"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var CreateInstrumentException_1 = __importDefault(require("../Exceptions/CreateInstrumentException"));
var Instrument = /** @class */ (function () {
    function Instrument(props) {
        this.id = props.id || (0, crypto_1.randomUUID)();
        this.name = props.name;
        this.validate();
    }
    Instrument.prototype.validate = function () {
        if (!this.name)
            throw new CreateInstrumentException_1.default('Name is required');
        if (this.name.trim().length === 0)
            throw new CreateInstrumentException_1.default('Name may not be empty');
    };
    Object.defineProperty(Instrument.prototype, "getId", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Instrument.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    return Instrument;
}());
exports.default = Instrument;
