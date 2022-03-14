"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageController_1 = require("../controller/imageController");
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.send("Api is running");
});
router.get("/image", imageController_1.getImage);
exports.default = router;
