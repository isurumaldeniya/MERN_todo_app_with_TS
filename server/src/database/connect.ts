import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()


export default async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/to_app');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
