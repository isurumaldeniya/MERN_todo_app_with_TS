import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

const TodoSchema = z.object({
  title: z.string().min(1, { message: 'Name is required.' }),
  description: z.string().min(1, 'Description is required.'),
  user: z.string().min(1, 'User name is required'),
});

type ITodo = z.infer<typeof TodoSchema>;

type Todo = {
  title: string;
  created_date: string;
  description: string;
  user: string;
  done: boolean;
  _id: string;
};

const Todo = () => {
  const [todoList, setTodoList] = useState<Array<Todo>>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/todos', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((todos: Array<Todo>) => {
        setTodoList(todos);
      });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodo>({ resolver: zodResolver(TodoSchema) });

  function handleFormSubmit(data: ITodo) {
    console.log(JSON.stringify(data));
    const response = fetch('http://localhost:8000/api/v1/todos', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.payload);
      });

    console.log(response);
  }
  return (
    <Container
      disableGutters
      sx={{
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        height: '90vh',
        // zIndex: 1201
      }}
    >
      <Stack>
        <Box
          sx={{
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            padding: 2,
          }}
        >
          <Typography>New Todo</Typography>
        </Box>
        <Box
          sx={{
            border: '1px solid lightblue',
            padding: 2,
            width: 500,
            '& .MuiInputBase-root': {
              minWidth: 350,
            },
          }}
        >
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl sx={{ minWidth: 450, gap: 2 }}>
              <FormGroup row sx={{ gap: 1, justifyContent: 'space-between' }}>
                <Typography>Task</Typography>
                <TextField id="todoName" {...register('title')} />
                {errors.title && (
                  <span
                    style={{
                      color: 'red',
                      display: 'flex',
                      justifyContent: 'center',
                      marginLeft: 100,
                    }}
                  >
                    {errors.title.message}
                  </span>
                )}
              </FormGroup>
              <FormGroup row sx={{ gap: 1, justifyContent: 'space-between' }}>
                <Typography>Description</Typography>
                <TextField
                  multiline
                  rows={3}
                  id="description"
                  {...register('description')}
                />
                {errors.description && (
                  <span
                    style={{
                      color: 'red',
                      display: 'flex',
                      justifyContent: 'center',
                      marginLeft: 100,
                    }}
                  >
                    {errors.description.message}
                  </span>
                )}
              </FormGroup>
              <FormGroup row sx={{ gap: 1, justifyContent: 'space-between' }}>
                <Typography>User</Typography>
                <TextField id="user" {...register('user')} />
                {errors.user && (
                  <span
                    style={{
                      color: 'red',
                      display: 'flex',
                      justifyContent: 'center',
                      marginLeft: 100,
                    }}
                  >
                    {errors.user.message}
                  </span>
                )}
              </FormGroup>
            </FormControl>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 16,
              }}
            >
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Box>
        <div
          style={{ display: 'flex', justifyContent: 'center', paddingTop: 30 }}
        >
          <Typography variant="h5">Todo List</Typography>
        </div>
        <List>
          {todoList.map((todo) => {
            return (
              <ListItem key={todo._id}>
                <Stack direction="row">
                  <Typography variant="h6">Title</Typography>
                  <ListItemText sx={{ paddingLeft: 5 }}>
                    ----- {todo.title}
                  </ListItemText>
                </Stack>
                <ListItemText>{todo.description}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </Container>
  );
};

export default Todo;
