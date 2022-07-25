const Card = require('../models/card');

const {
  ServerError,
  ValidationError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/index');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      next(new ServerError());
    });
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
        return;
      }

      next(new ServerError());
    });
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(new Error('Not Found'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(card._id).then(() => {
          res.send({ message: 'Пост удалён' });
        });

        return;
      }

      next(new ForbiddenError());
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

function likeCard(req, res, next) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавляем пользователя, если его еще там нет
    { new: true }
  )
    .orFail(new Error('Not Found'))
    .then((card) => res.status(200).send(card))
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

function dislikeCard(req, res, next) {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрали пользователя
    { new: true }
  )
    .orFail(new Error('Not Found'))
    .then((card) => res.status(200).send(card))
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
