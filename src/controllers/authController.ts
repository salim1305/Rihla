import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // pour hasher le mot de passe
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Define Role enum if not imported from elsewhere
enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Log la valeur reçue pour debug
    console.log('registerUser req.body:', req.body);
  const { email, password, name } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  // Always use Role.USER for registration, stocke aussi le nom si fourni
  const user = await prisma.user.create({ data: { email, password: hashed, role: Role.USER, name: name || null } });
  res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err: any) {
    console.error('Registration error:', err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message, stack: err.stack });
    } else {
      res.status(500).json({ error: "Failed to register user", details: err });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Failed to login" });
  }
};