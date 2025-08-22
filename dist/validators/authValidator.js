"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const validateSignup = (req, res, next) => {
    try {
        signupSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({ error: err.errors });
    }
};
exports.validateSignup = validateSignup;
const validateLogin = (req, res, next) => {
    try {
        loginSchema.parse(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({ error: err.errors });
    }
};
exports.validateLogin = validateLogin;
