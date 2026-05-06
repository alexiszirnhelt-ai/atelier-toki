import express from "express";

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Route de test
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Le serveur de L'Atelier Toki tourne ! 🏺",
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
