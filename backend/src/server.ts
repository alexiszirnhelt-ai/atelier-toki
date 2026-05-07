import express from "express";
import cors from "cors";
import "dotenv/config";
import productsRouter from "./routes/products.js";
import contactRouter from "./routes/contact.js";
import ordersRouter from "./routes/orders.js";
import webhooksRouter from "./routes/webhooks.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS — origines autorisées via variable d'environnement
// Format : CORS_ORIGIN=http://localhost:5173,https://atelier-toki.vercel.app
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans origine (ex: Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`CORS: origine non autorisée (${origin})`));
    },
    credentials: true,
  }),
);

// IMPORTANT : la route webhook DOIT être déclarée AVANT express.json()
// Sinon le body est parsé en JSON et la signature ne matchera plus
app.use("/api/webhooks", webhooksRouter);

// À partir de cette ligne, toutes les autres routes parsent le JSON
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Le serveur de L'Atelier Toki tourne ! 🏺",
  });
});

app.use("/api/products", productsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/orders", ordersRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée." });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
