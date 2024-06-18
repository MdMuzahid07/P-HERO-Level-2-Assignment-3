"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// importing path from nodejs, a built in module
const path_1 = __importDefault(require("path"));
// joining the .env file in current directory ,and setting in path using nodejs path module
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    database_url: process.env.DB_URL,
    port: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND
};
