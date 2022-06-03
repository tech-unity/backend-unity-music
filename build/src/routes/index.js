"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PeopleRoutes_1 = __importDefault(require("../routes/People/PeopleRoutes"));
var InstrumentRoutes_1 = __importDefault(require("../routes/Instruments/InstrumentRoutes"));
var ScalesRoutes_1 = __importDefault(require("../routes/Scales/ScalesRoutes"));
var express_1 = require("express");
var router = (0, express_1.Router)();
router.use(PeopleRoutes_1.default);
router.use(InstrumentRoutes_1.default);
router.use(ScalesRoutes_1.default);
// Middleware de erros padrao do express
router.use(function (error, req, res, next) {
    var status = error.statusCode || 500;
    var message = !error.message ? 'Internal Error' : error.message;
    // const stack = error.stack;
    res.status(status).json({ message: message });
});
exports.default = router;
