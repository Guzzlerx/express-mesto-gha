const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { TOKEN_KEY = 'hidden-key' } = process.env;

const {
  NotFoundError,
  ServerError,
  ValidationError,
  ConflictError,
  AuthorizationError,
} = require('../errors');

function getUsers(req, res, next) {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch(() => {
      next(new ServerError());
    });
}

function getUser(req, res, next) {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
        return;
      }

      if (err.message === 'Not Found') {
        next(new NotFoundError());
        return;
      }

      next(new ServerError());
    });
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(new Error('Not Found'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError());
        return;
      }

      if (err.message === 'Not Found') {
        next(new NotFoundError());
        return;
      }

      next(new ServerError());
    });
}

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;

  if (password.length < 5) {
    next(new ValidationError());
    return;
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => User.create({ name, about, avatar, email, password: hashedPassword,
    }))
    .then((user) => {
      const { name, about, avatar, email } = user; // eslint-disable-line
      res.status(201).send({ name, about, avatar, email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
        return;
      }

      if (err.name === 'MongoServerError') {
        next(new ConflictError());
        return;
      }

      next(new ServerError());
    });
}

function updateUserInfo(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
        return;
      }

      if (err.name === 'CastError') {
        next(new NotFoundError());
        return;
      }

      next(new ServerError());
    });
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
        return;
      }

      if (err.name === 'CastError') {
        next(new NotFoundError());
        return;
      }

      next(new ServerError());
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(new AuthorizationError());
        return;
      }

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new AuthorizationError());
            return;
          }

          const token = jwt.sign({ _id: user._id }, TOKEN_KEY, {
            expiresIn: '7d',
          });
          res
            .cookie('token', token, {
              maxAge: 3600000,
              httpOnly: true,
            })
            .status(200)
            .send({ message: 'Токен успешно отправлен' });
        })
        .catch(() => next(new ServerError()));
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,
};
