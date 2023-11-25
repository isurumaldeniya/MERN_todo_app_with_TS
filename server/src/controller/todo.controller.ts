import { Response, Request, NextFunction } from "express";
import { ITodoSchema, TodoModel, TodoSchema, TodoWithId } from "../models/todo.model";
import { ObjectId } from "mongodb";

export async function getTodos(req: Request, res: Response<Array<TodoWithId>>, next: NextFunction) {
  try {
    const todos = await TodoModel.find();
    res.json(todos)
  } catch (error) {
    console.log(error)
    // next(error)
  }
}

export async function createTodo(req: Request<ITodoSchema>, res: Response<string | object>, next: NextFunction) {
  try {
    // console.log(req.body)
    const validTodo = TodoSchema.safeParse(req.body);

    if (validTodo.success) {

      const todoDocument = TodoModel.create(validTodo.data);
      // console.log(todoDocument);
      (await todoDocument).save();
      res.json({ message: "Todo Created Successfully" });
    } else {
      const errorList: Array<string> = []
      validTodo.error.issues.map((issue) => {
        console.error(issue)
        errorList.push(`${issue.path} : ${issue.message}`)
      })
      res.json({ Error: errorList });
    }

  } catch (error) {
    console.log(error)
  }
}

export async function getTodo(req: Request, res: Response, next: NextFunction) {
  try {

    const todo = await TodoModel.findOne({ _id: new ObjectId(req.params.id) });
    if (!todo) {
      res.json({ message: 'Todo doesn\'t exit' });
    }
    res.json(todo)
  }

  catch (error) {
    console.log(error)
  }
}