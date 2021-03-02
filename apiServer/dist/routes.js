"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const UserController = require('./controllers/UserController');
const GroupController = require('./controllers/GroupController');
const BoardController = require('./controllers/BoardController');
const TaskController = require('./controllers/TaskController');
// * User Operations
routes.post('/user/register', UserController.createUser);
routes.post('/user/login', UserController.loginUser);
routes.get('/user/:id', UserController.getUser);
routes.patch('/user/:id/edit', UserController.editUser);
routes.delete('/user/:id', UserController.deleteUser);
// * Group Operations
routes.post('/group/create', GroupController.createGroup);
routes.post('/dashboard', GroupController.getAllGroups);
routes.get('/dashboard/group/:id', GroupController.getGroup);
routes.patch('/dashboard/group/:id/edit', GroupController.editGroup);
routes.delete('/dashboard/group/:id', GroupController.deleteGroup);
// * Board Operations
routes.patch('/dashboard/group/:id/board/create', BoardController.createBoard);
routes.get('/dashboard/group/:id/board/:boardId', BoardController.getBoard);
routes.patch('/dashboard/group/:id/board/:boardId/edit', BoardController.editBoard);
routes.delete('/dashboard/group/:id/board/:boardId', BoardController.deleteBoard);
// * Task Operations
//routes.get('/dashboard/group/:id/board/:boardId', TaskController.getAllTasks)
routes.post('/dashboard/group/:id/board/:boardId/task/create', TaskController.createTask);
routes.get('/dashboard/group/:id/board/:boardId/task/:taskId', TaskController.getTask);
routes.patch('/dashboard/group/:id/board/:boardId/task/:taskId', TaskController.updateTask);
routes.delete('/dashboard/group/:id/board/:boardId/task/:taskId', TaskController.deleteTask);
exports.default = routes;
//# sourceMappingURL=routes.js.map