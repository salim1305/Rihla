"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs")); // pour hasher le mot de passe
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// Define Role enum if not imported from elsewhere
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role || (Role = {}));
const registerUser = async (req, res) => {
    try {
        // Log la valeur reçue pour debug
        console.log('registerUser req.body:', req.body);
        const { email, password, name } = req.body;
        const hashed = await bcryptjs_1.default.hash(password, 10);
        // Always use Role.USER for registration, stocke aussi le nom si fourni
        const user = await prisma.user.create({ data: { email, password: hashed, role: Role.USER, name: name || null } });
        res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
    }
    catch (err) {
        console.error('Registration error:', err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message, stack: err.stack });
        }
        else {
            res.status(500).json({ error: "Failed to register user", details: err });
        }
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(401).json({ error: "Invalid credentials" });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(401).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to login" });
    }
};
exports.loginUser = loginUser;
