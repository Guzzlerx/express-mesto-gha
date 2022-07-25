class ConflictError extends Error {
  constructor() {
    super();
    this.statusCode = 409;
    this.message = 'Пользователь с такой почтой уже существует';
  }
}

module.exports = ConflictError;
