import { Response, Request, NextFunction } from 'express';
import {
  ITodoSchema,
  TodoModel,
  ITodoWithId,
} from '../models/todo.model';
import { IParamsWithId } from '../interfaces/ParamsWithId';

export async function getTodos(
  req: Request,
  res: Response<Array<ITodoWithId>>,
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

export async function getTodo(
  req: Request<IParamsWithId, ITodoWithId, Record<string, never>>,
  res: Response<ITodoWithId>,
  next: NextFunction
) {
  try {
    const todo = await TodoModel.findOne({ _id: req.params.id });
    if (!todo) {
      res.status(404);
      throw new Error('Todo Not Found');
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(
  req: Request<IParamsWithId, ITodoWithId, ITodoSchema>,
  res: Response<ITodoWithId>,
  next: NextFunction
) {
  try {
    const todo = await TodoModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!todo) {
      res.status(404);
      throw new Error('Todo Not Found');
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(
  req: Request<IParamsWithId, ITodoWithId, Record<string, never>>,
  res: Response<ITodoWithId>,
  next: NextFunction
) {
  try {
    const deletedTodo = await TodoModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedTodo) {
      res.status(404);
      throw new Error('Todo Not Found!');
    }
    res.json(deletedTodo);
  } catch (error) {
    next(error);
  }
}
