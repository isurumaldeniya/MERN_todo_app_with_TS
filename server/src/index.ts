import app from './app';
import connectToMongoDB from './database/connect';

import * as dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
