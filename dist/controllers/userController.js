"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMe = exports.updateMe = exports.getMe = exports.getUsers = void 0;
const userService = __importStar(require("../services/userService"));
const getUsers = async (_req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }
    catch (err) {
        next(err);
    }
};
exports.getUsers = getUsers;
const getMe = async (req, res, next) => {
    try {
        if (!req.user)
            throw new Error("Unauthorized");
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.getMe = getMe;
const updateMe = async (req, res, next) => {
    try {
        if (!req.user)
            throw new Error("Unauthorized");
        let data = req.body;
        // Si upload de fichier (avatar)
        if (req.file) {
            // URL relative pour l'avatar
            data = { ...data, avatar: `/uploads/${req.file.filename}` };
        }
        const user = await userService.updateUser(req.user.id, data);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.updateMe = updateMe;
const deleteMe = async (req, res, next) => {
    try {
        if (!req.user)
            throw new Error("Unauthorized");
        await userService.deleteUser(req.user.id);
        res.json({ message: "User deleted" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteMe = deleteMe;
