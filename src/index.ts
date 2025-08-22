import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import logger from "./utils/logger";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import listingRoutes from "./routes/listings";
import reservationRoutes from "./routes/reservations";
import reviewRoutes from "./routes/reviews";
import experienceRoutes from "./routes/experiences";
import adminRoutes from "./routes/admin";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();

// Swagger/OpenAPI setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rihla API",
      version: "1.0.0",
      description: "Documentation de l’API Rihla (plateforme d’expériences et de voyages)",
    },
    servers: [
      { url: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}` },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sécurité HTTP
app.use(helmet());
// Limite de requêtes (100 requêtes par 15 min par IP)
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
// Logger HTTP
app.use(morgan("dev"));
app.use(cors({
  origin(origin, cb) {
    const frontendUrls = process.env.FRONTEND_URL?.split(',') || [
      "http://localhost:3000",
      "http://localhost:5500",
      "http://127.0.0.1:5500",
    ];
    
    // Permettre les requêtes sans origin (ex: applications mobiles, Postman)
    if (!origin) return cb(null, true);
    
    // Vérifier si l'origin est dans la liste autorisée
    if (frontendUrls.includes(origin)) return cb(null, true);
    
    return cb(null, false);
  },
  credentials: true,
}));
// Désactive l'en-tête X-Powered-By pour éviter de révéler la stack
app.disable("x-powered-by");

// Sert les fichiers uploadés (avatars)
import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Sert les fichiers HTML statiques à la racine du projet
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/listings", listingRoutes);
app.use("/reservations", reservationRoutes);
app.use("/reviews", reviewRoutes);

app.use("/experiences", experienceRoutes);

app.use("/admin", adminRoutes);

app.get("/", (req: express.Request, res: express.Response) => res.send("🚀 Rihla API is running..."));

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => logger.info(`✅ Server running on http://localhost:${PORT}`));
}

export default app;
