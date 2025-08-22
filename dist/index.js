"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const listings_1 = __importDefault(require("./routes/listings"));
const reservations_1 = __importDefault(require("./routes/reservations"));
const reviews_1 = __importDefault(require("./routes/reviews"));
const experiences_1 = __importDefault(require("./routes/experiences"));
const admin_1 = __importDefault(require("./routes/admin"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
            { url: "http://localhost:" + (process.env.PORT || 5000) },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Sécurité HTTP
app.use((0, helmet_1.default)());
// Limite de requêtes (100 requêtes par 15 min par IP)
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 100 }));
// Logger HTTP
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin(origin, cb) {
        const allowed = [
            "http://localhost:3000",
            "http://localhost:5500",
            "http://127.0.0.1:5500",
        ];
        if (!origin || allowed.includes(origin))
            return cb(null, true); // !origin => file://
        return cb(null, false);
    },
    credentials: true,
}));
// Désactive l'en-tête X-Powered-By pour éviter de révéler la stack
app.disable("x-powered-by");
// Sert les fichiers uploadés (avatars)
const path_1 = __importDefault(require("path"));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Sert les fichiers HTML statiques à la racine du projet
app.use(express_1.default.static(path_1.default.join(__dirname, '..')));
app.use(express_1.default.json());
// Routes
app.use("/auth", auth_1.default);
app.use("/users", users_1.default);
app.use("/listings", listings_1.default);
app.use("/reservations", reservations_1.default);
app.use("/reviews", reviews_1.default);
app.use("/experiences", experiences_1.default);
app.use("/admin", admin_1.default);
app.get("/", (req, res) => res.send("🚀 Rihla API is running..."));
// Error handling
app.use((err, req, res, next) => {
    logger_1.default.error(err);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => logger_1.default.info(`✅ Server running on http://localhost:${PORT}`));
}
exports.default = app;
