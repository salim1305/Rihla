import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const requireRole = (role: string) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ error: "Forbidden: insufficient rights" });
  }
  if (req.user.role !== role) {
    return res.status(403).json({ error: "Forbidden: insufficient rights" });
  }
  next();
};
