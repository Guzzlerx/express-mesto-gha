class AuthorizationError extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Неверная почта или пароль';
  }
}

module.exports = AuthorizationError;
