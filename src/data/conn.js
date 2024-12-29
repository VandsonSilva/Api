"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var conn = new sequelize_1.Sequelize('db', 'root', 'root', {
    host: 'localhost',
    'dialect': 'mysql'
});
exports.default = conn;
