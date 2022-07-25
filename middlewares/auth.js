const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ message: 'Необходима авторизация.' });
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация.' });
  }

  req.user = payload;

  next();
}

module.exports = verifyToken;
