import {
  Box,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
  Checkbox,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Todo from './NewTask';
import axios, { AxiosError } from 'axios';

const TodoList = () => {
  const [todoList, setTodoList] = useState<Array<Todo>>([
    {
      title: '',
      created_date: '',
      description: '',
      user: '',
      done: false,
      _id: '',
    },
  ]);

  async function handleTaskComplete(id: string): Promise<Todo> {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/todos/${id}`
      );
      console.log(response.data);
      if (response.data) {
        setTodoList(todoList.filter((todo: Todo) => todo._id != id));
      }
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response);
      throw new Error(err.stack);
    }
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/todos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((todos: Array<Todo>) => {
        console.log(todos);
        setTodoList(todos);
      });
  }, []);
  return (
    <Paper
      sx={{
        paddingLeft: 30,
        minHeight: '20vh',
      }}
    >
      <Box>
        {todoList.length == 0 ? (
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            No Task Found
          </Typography>
        ) : (
          <>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
              Task List
            </Typography>
            <List sx={{ paddingBottom: 2 }}>
              {todoList.map((todo: Todo) => {
                return (
                  <>
                    <ListItem key={todo._id}>
                      <Stack gap={1}>
                        <Stack direction="row" gap={1}>
                          <Checkbox
                            defaultChecked={todo.done}
                            onClick={() => handleTaskComplete(todo._id)}
                          />
                          <Typography
                            variant="h6"
                            sx={{ paddingTop: 0.8, color: 'black' }}
                          >
                            {todo.title}
                          </Typography>
                        </Stack>
                        <Typography sx={{ paddingLeft: 3 }}>
                          {todo.description}
                        </Typography>
                        <Button sx={{ maxWidth: 100, bgcolor: 'lightgreen' }}>
                          Edit Task
                        </Button>
                      </Stack>
                    </ListItem>
                  </>
                );
              })}
            </List>
          </>
        )}
      </Box>
    </Paper>
  );
};
export default TodoList;
