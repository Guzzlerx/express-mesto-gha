const User = require("../models/user");
const {
  validationErrorMessage,
  castErrorMessage,
  serverErrorMessage,
} = require("../utils/error");

function getUsers(req, res) {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch(() => {
      res.status(500).send(serverErrorMessage);
    });
}

function getUser(req, res) {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send(castErrorMessage);
        return;
      }

      res.status(500).send(serverErrorMessage);
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send(validationErrorMessage);
        return;
      }

      res.status(500).send(serverErrorMessage);
    });
}

function updateUserInfo(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send(validationErrorMessage);
        return;
      }

      if (err.name === "CastError") {
        res.status(404).send(castErrorMessage);
        return;
      }

      res.status(500).send(serverErrorMessage);
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
      upsert: true,
    }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send(validationErrorMessage);
        return;
      }

      if (err.name === "CastError") {
        res.status(404).send(castErrorMessage);
        return;
      }

      res.status(500).send(serverErrorMessage);
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
