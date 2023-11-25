import { Router } from "express";
import { createTodo, getTodo, getTodos } from "../controller/todo.controller";

const router = Router();

router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/', createTodo);



export default router;
