"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    boards: { type: [], required: true },
    members: { type: {} },
    date: { type: Date, required: true },
});
// Export the model and return your ITask interface
exports.default = mongoose_1.default.model('Group', groupSchema);
//# sourceMappingURL=Group.js.map