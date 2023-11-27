import * as express from 'express';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as cors from 'cors';
import todoRouter from './routes/todo.routes';
import errorHandler from './middlewares/errorHanlder.middleware';
import notFoundErrorHandler from './middlewares/notFounctErrorHandler.middlewarwe';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/todos', todoRouter);

//error handler
app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;
