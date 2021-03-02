"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const AuthController = require('./controllers/AuthController');
// * Auth Operations
routes.post('/user/login', AuthController.loginUser);
routes.delete('/user/logout', AuthController.logoutUser);
routes.post('/user/token', AuthController.token);
exports.default = routes;
//# sourceMappingURL=routes.js.map