import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend Bafana Automations rodando",
    status: "ok"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    service: "bafana-backend"
  });
});

// Exporta o app para a Vercel (serverless)
export default app;

// Roda localmente apenas fora da Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}