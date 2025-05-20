import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import transactionRouter from "./routers/transactionRouter.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "https://my-wallet-front-end-delta.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(authRouter);
app.use(transactionRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 