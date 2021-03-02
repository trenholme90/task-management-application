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
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { author, title, description, status, date, } = req.body;
                const groupId = req.params.id;
                const boardId = req.params.boardId;
                const _id = uuid_1.v4();
                const newTask = {
                    _id,
                    author,
                    title,
                    description,
                    status,
                    date,
                };
                const reqGroup = yield Group_1.default.findById(groupId);
                let tasksUpdated;
                const updatedBoards = reqGroup.boards.map((board) => {
                    if (board._id === boardId) {
                        const updatedTasks = [...board.tasks, newTask];
                        const updatedBoard = board;
                        updatedBoard.tasks = updatedTasks;
                        tasksUpdated = true;
                        return updatedBoard;
                    }
                    else {
                        return board;
                    }
                });
                if (tasksUpdated) {
                    yield Group_1.default.updateOne({ _id: groupId }, {
                        $set: {
                            boards: updatedBoards,
                        },
                    });
                    return res
                        .status(200)
                        .json({ msg: 'Your new task has been added to the board!' });
                }
                else {
                    return res
                        .status(400)
                        .json({ msg: 'Sorry this board could not be found when creating a task' });
                }
            }
            catch (error) {
                throw Error(`Error while creating a new task: ${error}`);
            }
        });
    },
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.id;
                const boardId = req.params.boardId;
                const taskId = req.params.taskId;
                const reqGroup = yield Group_1.default.findById(groupId);
                const reqBoard = reqGroup.boards.filter((board) => board._id === boardId);
                const reqTask = reqBoard[0].tasks.filter((task) => task._id === taskId);
                if (reqTask.length === 0) {
                    return res.status(400).json({
                        message: 'This ID does not exist',
                    });
                }
                else {
                    return res.status(200).json(reqTask[0]);
                }
            }
            catch (error) {
                throw Error(`Error while deleting user: ${error}`);
            }
        });
    },
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { author, title, description, status, date, } = req.body;
                const groupId = req.params.id;
                const boardId = req.params.boardId;
                const taskId = req.params.taskId;
                const reqGroup = yield Group_1.default.findById(groupId);
                const reqBoard = reqGroup.boards.filter((board) => board._id === boardId);
                const reqTask = reqBoard[0].tasks.filter((task) => task._id === taskId);
                if (reqTask.length === 0) {
                    return res.status(400).json({
                        message: 'This ID does not exist',
                    });
                }
                else {
                    const updatedTasks = reqBoard[0].tasks.map((task) => {
                        if (task._id === taskId) {
                            const _id = taskId;
                            task = { _id, author, title, description, status, date };
                            return task;
                        }
                        else {
                            return task;
                        }
                    });
                    reqBoard[0].tasks = updatedTasks;
                    console.log(reqBoard[0]);
                    const updatedBoards = reqGroup.boards.map((board) => {
                        if (board._id === boardId) {
                            board = reqBoard[0];
                            return board;
                        }
                        else {
                            return board;
                        }
                    });
                    yield Group_1.default.updateOne({ _id: groupId }, {
                        $set: {
                            boards: updatedBoards,
                        },
                    });
                    return res.json({ message: 'Task Succesfully updated...' });
                }
            }
            catch (error) {
                throw Error(`Error while updating your task: ${error}`);
            }
        });
    },
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.id;
                const boardId = req.params.boardId;
                const taskId = req.params.taskId;
                const reqGroup = yield Group_1.default.findById(groupId);
                const reqBoard = reqGroup.boards.filter((board) => board._id === boardId);
                const reqTask = reqBoard[0].tasks.filter((task) => task._id === taskId);
                if (reqTask.length === 0) {
                    return res.status(400).json({
                        message: 'This ID does not exist',
                    });
                }
                else {
                    let taskDeleted = false;
                    const updatedTasks = reqBoard[0].tasks.map((task, index) => {
                        if (task._id === taskId) {
                            reqBoard[0].tasks.splice(index, 1);
                            taskDeleted = true;
                        }
                        else {
                            return task;
                        }
                    });
                    if (taskDeleted) {
                        reqBoard[0].tasks = updatedTasks;
                        const updatedBoards = reqGroup.boards.map((board) => {
                            if (board._id === boardId) {
                                board = reqBoard[0];
                                return board;
                            }
                            else {
                                return board;
                            }
                        });
                        yield Group_1.default.updateOne({ _id: groupId }, {
                            $set: {
                                boards: updatedBoards,
                            },
                        });
                        return res.status(200).json({ message: 'Task Succesfully deleted...' });
                    }
                    else {
                        return res
                            .status(400)
                            .json({ message: 'Sorry this task could not be found' });
                    }
                }
            }
            catch (error) {
                throw Error(`Error while deleting task: ${error}`);
            }
        });
    },
};
//# sourceMappingURL=TaskController.js.map