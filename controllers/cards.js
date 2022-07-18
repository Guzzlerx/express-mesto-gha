const Card = require("../models/card");
const handleError = require("../utils/error");

function getCards(req, res, next) {
    Card.find({})
        .then((cards) => res.status(200).send(cards))
        .catch((err) => handleError(err, res));
}

function createCard(req, res, next) {
    const { name, link } = req.body;

    Card.create({ name, link, owner: req.user })
        .then((card) => res.status(201).send(card))
        .catch((err) => handleError(err, res));
}

function deleteCard(req, res, next) {
    const { cardId } = req.params;

    Card.findByIdAndRemove(cardId)
        .then((cards) => res.send({ message: "Пост удалён" }))
        .catch((err) => handleError(err, res));
}

function likeCard(req, res, next) {
    const { cardId } = req.params;

    Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: req.user._id } }, // добавляем пользователя, если его еще там нет
        { new: true }
    )
        .then((card) => res.status(200).send(card))
        .catch((err) => handleError(err, res));
}

function dislikeCard(req, res, next) {
    const { cardId } = req.params;

    Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: req.user._id } }, // убрали пользователя
        { new: true }
    )
        .then((card) => res.status(200).send(card))
        .catch((err) => handleError(err, res));
}

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard,
};
