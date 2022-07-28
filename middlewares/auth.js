const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors/index');

const { TOKEN_KEY = 'hidden-key' } = process.env;

function verifyToken(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    next(new AuthorizationError());
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, TOKEN_KEY);
  } catch (err) {
    next(new AuthorizationError());
  }

  req.user = payload;

  next();
}

module.exports = verifyToken;
