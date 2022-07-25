class ForbiddenError extends Error {
  constructor() {
    super();
    this.message = 'У вас недостаточно прав для этого';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
