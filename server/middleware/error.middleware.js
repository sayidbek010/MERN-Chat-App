export const notFound = (req, res, next) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || "Something went wrong!";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Recoursce not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
