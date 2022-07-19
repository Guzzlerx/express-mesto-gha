const validationErrorMessage = { message: 'Переданы некорректные данные.' };
const findErrorMessage = { message: 'Данные не найдены по запросу.' };
const serverErrorMessage = { message: 'Сервер не отвечает.' };

const validationErrorStatusCode = 400;
const findErrorStatusCode = 404;
const serverErrorStatusCode = 500;

module.exports = {
  validationErrorMessage,
  findErrorMessage,
  serverErrorMessage,
  validationErrorStatusCode,
  findErrorStatusCode,
  serverErrorStatusCode,
};
