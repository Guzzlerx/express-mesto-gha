const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).send({ message: 'Необходима авторизация.' });
    return;
  }

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
