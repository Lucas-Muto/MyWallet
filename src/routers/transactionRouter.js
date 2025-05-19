import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import transactionSchema from "../schemas/transactionSchema.js";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "../controllers/transactionController.js";

const transactionRouter = Router();

transactionRouter.use(authMiddleware);

transactionRouter.post("/transactions", validateSchema(transactionSchema), createTransaction);
transactionRouter.get("/transactions", getTransactions);
transactionRouter.put("/transactions/:id", validateSchema(transactionSchema), updateTransaction);
transactionRouter.delete("/transactions/:id", deleteTransaction);

export default transactionRouter; 