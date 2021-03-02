"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const generateAccesstoken_1 = __importDefault(require("../functions/generateAccesstoken"));
module.exports = {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email, } = req.body;
                const userCredentials = req.body;
                const userExists = yield User_1.default.findOne({ email });
                // if no user in the database
                if (!userExists) {
                    return res.status(200).json({
                        message: 'User not found. Do you want to register instead?',
                    });
                }
                // if password matches return user and email to be stored in browser
                if (userExists && (yield bcrypt_1.default.compare(password, userExists.password))) {
                    const { firstName, lastName, password, email, avatar, friends } = userExists;
                    const userInfo = {
                        firstName,
                        lastName,
                        password,
                        email,
                        avatar,
                        friends,
                    };
                    const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
                    const accessToken = generateAccesstoken_1.default({ name: fullName });
                    const refreshToken = jsonwebtoken_1.default.sign(userInfo, process.env.REFRESH_TOKEN_SECRET);
                    yield RefreshToken_1.default.create({ token: refreshToken });
                    return res.json({ userInfo, accessToken, refreshToken });
                }
                else {
                    return res
                        .status(200)
                        .json({ message: 'User email or password does not match' });
                }
            }
            catch (error) {
                throw Error(`Error while logging in new user: ${error}`);
            }
        });
    },
    token(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingToken = yield RefreshToken_1.default.findOne({
                    token: req.body.token,
                });
                if (req.body.token === null)
                    return res.sendStatus(401);
                if (existingToken === null)
                    return res.sendStatus(403);
                jsonwebtoken_1.default.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) {
                        res.sendStatus(403);
                    }
                    const fullName = `${user.firstName} ${user.lastName}`;
                    const accessToken = generateAccesstoken_1.default({ name: fullName });
                    res.json({ accessToken });
                });
            }
            catch (error) {
                throw Error(`Error while creating new token: ${error}`);
            }
        });
    },
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield RefreshToken_1.default.findOneAndDelete({ token: req.body.token }, (err) => {
                    if (err) {
                        return res.sendStatus(403);
                    }
                    return res.sendStatus(204);
                });
            }
            catch (error) {
                throw Error(`Problem logging out user: ${error}`);
            }
        });
    },
};
//# sourceMappingURL=AuthController.js.map