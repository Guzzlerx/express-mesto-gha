const ServerError = require('./ServerError');
const NotFoundError = require('./NotFoundError');
const ValidationError = require('./ValidationError');
const ForbiddenError = require('./ForbiddenError');
const ConflictError = require('./ConflictError');
const AuthorizationError = require('./AuthorizationError');

module.exports = {
  ServerError,
  NotFoundError,
  ValidationError,
  ForbiddenError,
  ConflictError,
  AuthorizationError,
};
