import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET must be set in environment variables");

export interface AuthRequest extends Request {
  user?: { id: number; email: string; role?: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role?: string; exp?: number };
    // Option future : vérifier la blacklist ici
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    return res.status(401).json({ error: "Invalid or missing token" });
  }
};