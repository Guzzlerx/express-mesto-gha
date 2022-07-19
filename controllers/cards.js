const Card = require('../models/card');
const {
  validationErrorMessage,
  findErrorMessage,
  serverErrorMessage,
  serverErrorStatusCode,
  findErrorStatusCode,
  validationErrorStatusCode,
} = require('../utils/error');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(serverErrorStatusCode).send(serverErrorMessage);
    });
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationErrorStatusCode).send(validationErrorMessage);
        return;
      }

      res.status(serverErrorStatusCode).send(serverErrorMessage);
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new Error('Not found'))
    .then(() => res.send({ message: 'Пост удалён' }))
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

function likeCard(req, res) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавляем пользователя, если его еще там нет
    { new: true }
  )
    .orFail(new Error('Not found'))
    .then((card) => res.status(200).send(card))
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

function dislikeCard(req, res) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрали пользователя
    { new: true }
  )
    .orFail(new Error('Not found'))
    .then((card) => res.status(200).send(card))
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
