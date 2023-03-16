
import * as dotenv from 'dotenv' 
dotenv.config()
import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence'

const connection = {};



async function dbConnection() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });
  const AutoIncrement = AutoIncrementFactory(db);
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnection;