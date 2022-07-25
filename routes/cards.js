const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');

router.use(auth);

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.delete('/cards/:cardId/likes', dislikeCard);
router.put('/cards/:cardId/likes', likeCard);

module.exports = router;
