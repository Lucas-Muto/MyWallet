import bcrypt from "bcrypt";
import db from "../database.js";
import jwt from "jsonwebtoken";

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

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).send("E-mail não cadastrado");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send("Senha incorreta");

    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Erro ao fazer login");
  }
} 