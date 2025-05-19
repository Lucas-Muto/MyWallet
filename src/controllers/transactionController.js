import db from "../database.js";
import { ObjectId } from "mongodb";

export async function createTransaction(req, res) {
  const { value, description, type } = req.body;
  const userId = req.user.userId;
  const date = new Date();

  try {
    await db.collection("transactions").insertOne({
      userId,
      value,
      description,
      type,
      date
    });
    res.status(201).send("Transação criada com sucesso");
  } catch (err) {
    res.status(500).send("Erro ao criar transação");
  }
}

export async function getTransactions(req, res) {
  const userId = req.user.userId;
  const page = parseInt(req.query.page) || 1;
  if (page < 1) return res.status(400).send("Página inválida");

  try {
    const transactions = await db.collection("transactions")
      .find({ userId })
      .sort({ date: -1 })
      .skip((page - 1) * 10)
      .limit(10)
      .toArray();
    res.send(transactions);
  } catch (err) {
    res.status(500).send("Erro ao buscar transações");
  }
}

export async function updateTransaction(req, res) {
  const { value, description, type } = req.body;
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
    if (!transaction) return res.status(404).send("Transação não encontrada");
    if (transaction.userId !== userId) return res.status(401).send("Não autorizado");

    await db.collection("transactions").updateOne(
      { _id: new ObjectId(id) },
      { $set: { value, description, type } }
    );
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Erro ao atualizar transação");
  }
}

export async function deleteTransaction(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
    if (!transaction) return res.status(404).send("Transação não encontrada");
    if (transaction.userId !== userId) return res.status(401).send("Não autorizado");

    await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Erro ao deletar transação");
  }
} 