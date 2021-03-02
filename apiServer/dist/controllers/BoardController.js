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
const uuid_1 = require("uuid");
const Group_1 = __importDefault(require("../models/Group"));
module.exports = {
    createBoard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { author, title, description, members, columns, tasks, date, } = req.body;
                const groupId = req.params.id;
                const _id = uuid_1.v4();
                const newBoard = {
                    _id,
                    author,
                    title,
                    description,
                    members,
                    columns,
                    tasks,
                    date,
                };
                const reqGroup = yield Group_1.default.findById(groupId);
                const boardWithTitleMatch = () => {
                    const isTitleMatch = reqGroup.boards.filter((board) => board.title === title);
                    return isTitleMatch;
                };
                const existingBoard = boardWithTitleMatch().length > 0;
                if (!existingBoard) {
                    const reqBoards = reqGroup.boards;
                    const updatedBoards = [...reqBoards, newBoard];
                    yield Group_1.default.updateOne({ _id: groupId }, {
                        $set: {
                            boards: updatedBoards,
                        },
                    });
                    return res.json({ msg: 'Your new board has been added to this group!' });
                }
                return res.status(400).json({
                    message: 'A board with this name already exisits! Please use a different name for your group',
                });
            }
            catch (error) {
                throw Error(`Error while creating new board: ${error}`);
            }
        });
    },
    getBoard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = req.params.id;
            const boardId = req.params.boardId;
            try {
                const reqGroup = yield Group_1.default.findById(groupId);
                const boards = reqGroup.boards;
                const reqBoard = boards.filter((board) => (board._id === boardId ? board : null));
                if (reqBoard.length > 1)
                    return res.json({ msg: 'Something went wrong. This board has duplication' });
                else
                    return res.json(reqBoard[0]);
            }
            catch (error) {
                res.status(400).json({
                    message: 'Board ID does not exist. Did you delete this board?',
                });
            }
        });
    },
    editBoard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, members, columns, date, } = req.body;
            const groupId = req.params.id;
            const boardId = req.params.boardId;
            try {
                const reqGroup = yield Group_1.default.findById(groupId);
                const boards = reqGroup.boards;
                const updatedBoards = boards.map((board) => {
                    const newMembers = members.filter((newMember) => {
                        let existingIdMatch = [];
                        const newMemberId = newMember._id;
                        board.members.forEach((existingMember) => {
                            const existingMemberId = existingMember._id;
                            if (existingMemberId === newMemberId)
                                existingIdMatch.push(existingMemberId);
                        });
                        if (existingIdMatch.length === 0)
                            return newMember;
                        else
                            return false;
                    });
                    if (board._id === boardId) {
                        board.title = title;
                        board.description = description;
                        board.columns = columns;
                        board.date = date;
                        if (board.members.length === 0)
                            board.members.push(...members);
                        else {
                            board.members.push(...newMembers);
                        }
                    }
                    return board;
                });
                yield Group_1.default.updateOne({ _id: groupId }, {
                    $set: {
                        boards: updatedBoards,
                    },
                });
                return res.json({ message: 'Board Succesfully updated...' });
            }
            catch (error) {
                res.status(400).json({
                    message: `Failed to update this Group. Has it been deleted?: ${error}`,
                });
            }
        });
    },
    deleteBoard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = req.params.id;
            const boardId = req.params.boardId;
            try {
                const reqGroup = yield Group_1.default.findById(groupId);
                const boards = reqGroup.boards;
                let boardDeleted = false;
                boards.map((board, index) => {
                    if (board._id === boardId) {
                        boards.splice(index, 1);
                        boardDeleted = true;
                    }
                });
                if (!boardDeleted)
                    res.json({ msg: 'Something went wrong. This board was not found' });
                else {
                    yield Group_1.default.updateOne({ _id: groupId }, {
                        $set: {
                            boards: boards,
                        },
                    });
                    return res.json(`Board deleted. ${boards}`);
                }
            }
            catch (error) {
                res.status(400).json({
                    message: 'Board ID does not exist. Did you delete this board?',
                });
            }
        });
    },
};
//# sourceMappingURL=BoardController.js.map