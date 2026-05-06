import express from "express";
import cors from "cors";
import "dotenv/config";
import productsRouter from "./routes/products.js";
import contactRouter from "./routes/contact.js";
import ordersRouter from "./routes/orders.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
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
