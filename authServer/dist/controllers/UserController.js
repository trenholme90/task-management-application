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
const User_1 = __importDefault(require("../models/User"));
module.exports = {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, password, email, friends, avatar, } = req.body;
                const existingUser = yield User_1.default.findOne({ email });
                if (!existingUser) {
                    // sets hash password to database for security. The higher the number the bigger the password.
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    const user = yield User_1.default.create({
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword,
                        friends,
                        avatar,
                    });
                    // don't return password to client
                    return res.json({
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        friends,
                        avatar,
                    });
                }
                return res.status(400).json({
                    message: 'Email user already exisits! Do you want to login instead',
                });
            }
            catch (error) {
                throw Error(`Error while registering new user: ${error}`);
            }
        });
    },
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const user = yield User_1.default.findById(userId);
                return res.json(user);
            }
            catch (error) {
                res.status(400).json({
                    message: 'User ID does not exist. Register here!',
                });
            }
        });
    },
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, password, email, friends, avatar, } = req.body;
            try {
                yield User_1.default.updateMany({}, { firstName, lastName, password, email, friends, avatar });
                return res.json('Your user information has succesfully been update!');
            }
            catch (error) {
                res.status(400).json({
                    message: `Failed to update your user information: ${error}`,
                });
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                yield User_1.default.findOneAndDelete({ _id: userId });
                return res.json('User has successfully been deleted');
            }
            catch (error) {
                res.status(400).json({
                    message: `Something went wrong while deleting your account: ${error}`,
                });
            }
        });
    },
};
//# sourceMappingURL=UserController.js.map