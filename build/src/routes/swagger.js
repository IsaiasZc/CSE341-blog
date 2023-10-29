"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../swagger.json"));
const router = express_1.default.Router();
router.use('/api-docs', swagger_ui_express_1.default.serve); // swaggerUi.serve()
router.get('/api-docs', swagger_ui_express_1.default.setup(swagger_json_1.default));
module.exports = router;
//# sourceMappingURL=swagger.js.map