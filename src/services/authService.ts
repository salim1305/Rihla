import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const signupService = async (data: { email: string; password: string }) => {
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: { email: data.email, password: hashed },
  });
  return { id: user.id, email: user.email };
};

export const loginService = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};
