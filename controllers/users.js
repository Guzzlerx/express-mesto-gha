const User = require('../models/user');
const {
  validationErrorMessage,
  findErrorMessage,
  serverErrorMessage,
  serverErrorStatusCode,
  findErrorStatusCode,
  validationErrorStatusCode,
} = require('../utils/error');

function getUsers(req, res) {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch(() => {
      res.status(serverErrorStatusCode).send(serverErrorMessage);
    });
}

function getUser(req, res) {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error('Not found'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validationErrorStatusCode).send(validationErrorMessage);
        return;
      }

      if (err.message === 'Not found') {
        res.status(findErrorStatusCode).send(findErrorMessage);
        return;
      }

      res.status(serverErrorStatusCode).send(serverErrorMessage);
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationErrorStatusCode).send(validationErrorMessage);
        return;
      }

      res.status(serverErrorStatusCode).send(serverErrorMessage);
    });
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationErrorStatusCode).send(validationErrorMessage);
        return;
      }

      if (err.name === 'CastError') {
        res.status(findErrorStatusCode).send(findErrorMessage);
        return;
      }

      res.status(serverErrorStatusCode).send(serverErrorMessage);
    });
}

function updateUserAvatar(req, res) {
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
        res.status(validationErrorStatusCode).send(validationErrorMessage);
        return;
      }

      if (err.name === 'CastError') {
        res.status(findErrorStatusCode).send(findErrorMessage);
        return;
      }

      res.status(serverErrorStatusCode).send(serverErrorMessage);
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
