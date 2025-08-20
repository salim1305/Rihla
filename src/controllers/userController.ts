import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    const user = await userService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    let data = req.body;
    // Si upload de fichier (avatar)
    if (req.file) {
      // URL relative pour l'avatar
      data = { ...data, avatar: `/uploads/${req.file.filename}` };
    }
    const user = await userService.updateUser(req.user.id, data);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    await userService.deleteUser(req.user.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};