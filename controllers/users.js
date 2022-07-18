const User = require("../models/user");
const handleError = require("../utils/error");

function getUsers(req, res, next) {
    User.find({})
        .then((data) => res.status(200).send(data))
        .catch((err) => handleError(err, res));
}

function getUser(req, res, next) {
    const { userId } = req.params;

    User.findById(userId)
        .then((user) => res.status(200).send(user))
        .catch((err) => handleError(err, res));
}

function createUser(req, res, next) {
    const { name, about, avatar } = req.body;

    User.create({ name, about, avatar })
        .then((user) => res.status(201).send(user))
        .catch((err) => handleError(err, res));
}

function updateUserInfo(req, res, next) {
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
        .catch((err) => handleError(err, res));
}

function updateUserAvatar(req, res, next) {
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
        .catch((err) => handleError(err, res));
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUserInfo,
    updateUserAvatar,
};
