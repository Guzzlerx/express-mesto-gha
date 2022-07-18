const Card = require("../models/card");
const {
  validationErrorMessage,
  castErrorMessage,
  serverErrorMessage,
} = require("../utils/error");

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send(serverErrorMessage);
    });
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send(validationErrorMessage);
        return;
      }

      res.status(500).send(serverErrorMessage);
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(() => res.send({ message: "Пост удалён" }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send(castErrorMessage);
        return;
      }

      res.status(500).send(serverErrorMessage);
    });
}

function likeCard(req, res) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавляем пользователя, если его еще там нет
    { new: true }
  )
    .then((card) => res.status(200).send(card))
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

function dislikeCard(req, res) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрали пользователя
    { new: true }
  )
    .then((card) => res.status(200).send(card))
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
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
