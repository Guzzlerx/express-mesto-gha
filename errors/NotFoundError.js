class NotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Данные не найдены по запросу';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
