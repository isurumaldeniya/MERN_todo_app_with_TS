import * as express from 'express';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as cors from 'cors';
import todoRouter from './routes/todo.routes';

const app = express();


app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/todos', todoRouter)


export default app;