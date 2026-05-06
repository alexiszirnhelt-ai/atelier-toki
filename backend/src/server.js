import express from "express";
import cors from "cors";
import "dotenv/config";
import productsRouter from "./routes/products.js";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globaux
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Route de santé
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Le serveur de L'Atelier Toki tourne ! 🏺",
  });
});

// Routes métier
app.use("/api/products", productsRouter);
app.use("/api/contact", contactRouter);

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée." });
});

// Démarrage
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
