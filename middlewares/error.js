function handleError(err, req, res, next) { //eslint-disable-line
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'Сервер не отвечает' : message });
}

module.exports = handleError;
