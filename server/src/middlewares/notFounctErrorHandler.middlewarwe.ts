import { NextFunction, Request, Response } from 'express';

export default function notFoundErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}
