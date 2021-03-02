"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(fullName) {
    const accessToken = jsonwebtoken_1.default.sign(fullName, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
    });
    return accessToken;
}
exports.default = generateAccessToken;
//# sourceMappingURL=generateAccesstoken.js.map