import { Response, Request, NextFunction } from 'express';
import { ITodoSchema, TodoModel, TodoWithId } from '../models/todo.model';

export async function getTodos(
  req: Request,
  res: Response<Array<TodoWithId>>,
  next: NextFunction
) {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

export async function createTodo(
  req: Request<Record<string, never>, string | object, ITodoSchema>,
  res: Response<string | object>,
  next: NextFunction
) {
  try {
    const todoDocument = await TodoModel.create(req.body);
    todoDocument.save();
    res.json({ payload: todoDocument });
  } catch (error) {
    next(error);
  }
}

export async function getTodo(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.params);
    const todo = await TodoModel.findOne({ _id: req.params.id });
    if (!todo) {
      res.json({ message: "Todo doesn't exit" });
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
}
