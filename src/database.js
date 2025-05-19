import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db(); // Não define nome customizado
  console.log("Conectado ao MongoDB");
} catch (error) {
  console.error("Erro ao conectar ao MongoDB:", error);
}

export default db; 