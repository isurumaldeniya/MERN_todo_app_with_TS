import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

type zodError = {
  code: string;
  expected: string;
  received: string;
  path: Array<string>;
  message: string;
};
export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  const errorList: Array<object> = [];
  if (error instanceof ZodError) {
    console.log(error);
    JSON.parse(error.message).map((error: zodError) => {
      errorList.push({
        fieldName: error.path[0],
        errorMessage: error.message,
      });
    });
    res
      .json({
        message: errorList,
        stack: error.stack,
      })
      .end();
  } else {
    res
      .json({
        message: error.message,
        stack: error.stack,
      })
      .end();
  }
}
