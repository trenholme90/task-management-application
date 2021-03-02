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
const Group_1 = __importDefault(require("../models/Group"));
module.exports = {
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { author, title, description, boards, members, date, } = req.body;
                const existingGroup = yield Group_1.default.findOne({ title });
                if (!existingGroup) {
                    const group = yield Group_1.default.create({
                        author,
                        title,
                        description,
                        boards,
                        members,
                        date,
                    });
                    // don't return password to client
                    return res.json({
                        _id: group._id,
                        author: group.author,
                        title: group.title,
                        description: group.description,
                        boards: group.boards,
                        members: group.members,
                        date: group.date,
                    });
                }
                return res.status(400).json({
                    message: 'A group with this name already exisits! Please use a different name for your group',
                });
            }
            catch (error) {
                throw Error(`Error while creating new group: ${error}`);
            }
        });
    },
    getGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = req.params.id;
            try {
                const group = yield Group_1.default.findById(groupId);
                return res.json(group);
            }
            catch (error) {
                res.status(400).json({
                    message: 'Group ID does not exist. Did you delete this group?',
                });
            }
        });
    },
    getAllGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const userID = req.body.params._id;
            try {
                const groups = yield Group_1.default.find({ author: userID });
                if (groups.length === 0) {
                    return res.status(400).json({
                        message: 'No groups exist for this user',
                    });
                }
                else
                    return res.json(groups);
            }
            catch (error) {
                res.status(400).json({
                    message: 'An error occurred while reteiving your groups',
                });
            }
        });
    },
    editGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { author, title, description, boards, members, date, } = req.body;
            try {
                yield Group_1.default.updateMany({}, { author, title, description, boards, members, date });
                return res.json('Your group has succesfully been update!');
            }
            catch (error) {
                res.status(400).json({
                    message: `Failed to update this Group. Has it been deleted?: ${error}`,
                });
            }
        });
    },
    deleteGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = req.params.id;
            try {
                yield Group_1.default.findOneAndDelete({ _id: groupId });
                return res.json('Group has successfully been deleted');
            }
            catch (error) {
                res.status(400).json({
                    message: 'Group ID does not exist. Did you delete this group?',
                });
            }
        });
    },
};
//# sourceMappingURL=GroupController.js.map