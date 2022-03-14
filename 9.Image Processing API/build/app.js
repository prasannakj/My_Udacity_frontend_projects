"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var port = 3000;
// Serve static files
app.use(express_1.default.static("public"));
// Api routes
app.use("/api", index_1.default);
// Run server on port 3000
app.listen(port, function () { return console.log("Listening on port " + port + "\nVisit: http://localhost:3000"); });
exports.default = app;
