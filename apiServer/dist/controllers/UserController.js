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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email, } = req.body;
                if (!email || !password) {
                    return res.status(200).json({ message: 'Required field missing' });
                }
                const user = yield User_1.default.findOne({ email });
                // if no user in the database
                if (!user) {
                    return res.status(200).json({
                        message: 'User not found. Do you want to register instead?',
                    });
                }
                // if password matches return user and email to be stored in browser
                if (user && (yield bcrypt_1.default.compare(password, user.password))) {
                    const userResponse = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    };
                    return res.json(userResponse);
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