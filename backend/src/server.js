import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import './config/db.js'

dotenv.config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API Finance App Funcionando!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
