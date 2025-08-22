// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Configuration
dotenv.config();
const app = express();
// ...existing code...

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/rihla")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// ---- Modèle utilisateur ----
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// ---- ROUTES AUTH ----

// Enregistrement
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    res.json({ message: "✅ Utilisateur enregistré avec succès" });
  } catch (err) {
    res.status(400).json({ error: "❌ Erreur lors de l'inscription : " + err.message });
  }
});

// Connexion
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Utilisateur introuvable" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    res.json({ message: "✅ Connecté avec succès", token });
  } catch (err) {
    res.status(400).json({ error: "❌ Erreur de connexion : " + err.message });
  }
});

// ...la route '/' qui sert index.html est déjà définie plus bas...

// Servir les fichiers statiques du dossier racine
const path = require('path');
app.use(express.static(path.join(__dirname)));

// Route par défaut : renvoyer index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Lancer serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});