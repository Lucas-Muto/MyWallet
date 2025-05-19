import bcrypt from "bcrypt";
import db from "../database.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExists = await db.collection("users").findOne({ email });
    if (userExists) return res.status(409).send("E-mail já cadastrado");

    const hash = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ name, email, password: hash });

    res.status(201).send("Usuário cadastrado com sucesso");
  } catch (err) {
    res.status(500).send("Erro ao cadastrar usuário");
  }
} 