"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
// const path = require("path");
const app = express_1.default();
const PORT = process.env.PORT || 3000;
// Only use env variables if not production
if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
// Enable cors on all routes
app.use(cors_1.default());
// No need for body-parser
app.use(express_1.default.json());
try {
    mongoose_1.default.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log('DB connected');
}
catch (error) {
    console.log(error);
}
//app.use("/assets", express.static(path.resolve(__dirname, "..", "assets")));
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
//# sourceMappingURL=server.js.map