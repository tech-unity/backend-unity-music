"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var CreateScaleException_1 = __importDefault(require("../Exceptions/CreateScaleException"));
var Scale = /** @class */ (function () {
    function Scale(props) {
        this.id = props.id || (0, crypto_1.randomUUID)();
        this.date = props.date;
        this.band = props.band || [];
        this.singers = props.singers;
        this.validate();
    }
    Scale.prototype.validate = function () {
        if (!this.id)
            throw new CreateScaleException_1.default('Id is required');
        if (!this.date)
            throw new CreateScaleException_1.default('Date is required');
        if (!this.band)
            throw new CreateScaleException_1.default('Band is required');
        if (!this.singers)
            throw new CreateScaleException_1.default('Singers is required');
    };
    Object.defineProperty(Scale.prototype, "getId", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scale.prototype, "getDate", {
        get: function () {
            return this.date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scale.prototype, "getBand", {
        get: function () {
            return this.band;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Scale.prototype, "getSingers", {
        get: function () {
            return this.singers;
        },
        enumerable: false,
        configurable: true
    });
    return Scale;
}());
exports.default = Scale;
