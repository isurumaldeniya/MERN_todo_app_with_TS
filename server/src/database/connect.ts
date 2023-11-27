import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()


export default async function connectToMongoDB() {
  try {
    const db =  mongoose.connect('mongodb://localhost:27017/todo_app');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
