"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const AuthRoute_1 = __importDefault(require("./Routes/AuthRoute"));
const QueueRoute_1 = __importDefault(require("./Routes/QueueRoute"));
const AdminRoute_1 = __importDefault(require("./Routes/AdminRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'home.html'));
});
app.use('/api', AuthRoute_1.default);
app.use('/api', QueueRoute_1.default);
app.use('/api', AdminRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Static path: ${path_1.default.join(__dirname, '../public')}`);
});
//push
//# sourceMappingURL=index.js.map