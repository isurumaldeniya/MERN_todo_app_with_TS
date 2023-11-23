import * as express from 'express';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


export default app;