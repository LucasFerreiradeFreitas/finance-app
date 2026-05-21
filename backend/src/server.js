import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

//Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API Finance App Funcionando!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
