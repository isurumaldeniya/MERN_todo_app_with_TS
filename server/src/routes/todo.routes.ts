import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '../controller/todo.controller';
import validateRequest from '../middlewares/validateRequest.middleware';
import { ParamsWithId } from '../interfaces/ParamsWithId';
import { TodoSchema } from '../models/todo.model';

const router = Router();

router.get('/', getTodos);
router.get('/:id', validateRequest({ params: ParamsWithId }), getTodo);
router.post('/', validateRequest({ body: TodoSchema }), createTodo);
router.put(
  '/',
  validateRequest({ params: ParamsWithId, body: TodoSchema }),
  updateTodo
);
router.delete('/:id', validateRequest({ params: ParamsWithId }), deleteTodo);

export default router;
