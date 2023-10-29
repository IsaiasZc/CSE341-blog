"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./db/connect"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 5050;
const options = {
    explorer: true
};
// connect to database
(0, connect_1.default)();
app
    .use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, options))
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use('/', index_1.default);
app.listen(PORT, () => console.log(`It's working on port ${PORT}`));
//# sourceMappingURL=server.js.map