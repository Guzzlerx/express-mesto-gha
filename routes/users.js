const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,
} = require('../controllers/users');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
      password: Joi.string().required().min(5),
    }),
  }),
  login
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .required()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'ru'] },
          }),
        password: Joi.string().required().min(5),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().regex(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ // eslint-disable-line
        ),
      })
      .unknown(true),
  }),
  createUser
);

router.use(auth);

router.get('/users/me', getCurrentUser);
router.get('/users', getUsers);
router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum(),
    }),
  }),
  getUser
);
router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserInfo
);
router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string(),
    }),
  }),
  updateUserAvatar
);

module.exports = router;
