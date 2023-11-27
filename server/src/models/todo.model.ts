import { WithId } from 'mongodb';
import { Schema, model } from 'mongoose';
import * as zod from 'zod';

export const TodoSchema = zod.object({
  title: zod.string().min(1, { message: 'title cannot be empty' }),
  created_date: zod.date().default(new Date()),
  description: zod.string().min(1),
  user: zod.string().min(1).max(20),
  done: zod.boolean().default(false),
});

export type ITodoSchema = zod.infer<typeof TodoSchema>;
export type ITodoWithId = WithId<ITodoSchema>;

//creating mongoose schema
export const Todo = new Schema<ITodoSchema>({
  title: { type: String, required: true },
  created_date: { type: Date, required: true },
  description: { type: String, required: true },
  user: { type: String, required: true },
  done: { type: Boolean, required: true },
});

export const TodoModel = model<ITodoSchema>('Todo', Todo);
