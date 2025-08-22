"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.signupService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const signupService = async (data) => {
    const hashed = await bcrypt_1.default.hash(data.password, 10);
    const user = await prisma.user.create({
        data: { email: data.email, password: hashed },
    });
    return { id: user.id, email: user.email };
};
exports.signupService = signupService;
const loginService = async (data) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user)
        throw new Error("Invalid credentials");
    const match = await bcrypt_1.default.compare(data.password, user.password);
    if (!match)
        throw new Error("Invalid credentials");
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};
exports.loginService = loginService;
