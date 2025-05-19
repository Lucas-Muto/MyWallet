import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import transactionRouter from "./routers/transactionRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(authRouter);
app.use(transactionRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 