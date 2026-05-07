import express from "express";
import cors from "cors";
import "dotenv/config";
import productsRouter from "./routes/products.js";
import contactRouter from "./routes/contact.js";
import ordersRouter from "./routes/orders.js";
import webhooksRouter from "./routes/webhooks.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Accepte localhost et toute IP du réseau local (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
// pour permettre le test depuis un mobile sur le même Wi-Fi en dev.
const LOCAL_ORIGIN_REGEX =
  /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/;

app.use(
  cors({
    origin: (origin, callback) => {
      // Pas d'origin = requête same-origin, curl, ou Postman → on laisse passer
      if (!origin) return callback(null, true);
      if (LOCAL_ORIGIN_REGEX.test(origin)) return callback(null, true);
      callback(new Error(`Origine non autorisée : ${origin}`));
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
