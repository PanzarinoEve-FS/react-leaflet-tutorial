export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity
export function errorHandler(err, req, res, next) {
  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

  // Mongoose validation errors -> 400 with a readable message
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Malformed ObjectId in the URL -> 404 rather than a 500
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    status = 404;
    message = 'Item not found';
  }

  res.status(status).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}
