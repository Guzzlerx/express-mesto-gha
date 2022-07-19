const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env; // eslint-disable-line

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  req.user = {
    _id: '62d411ef7ebeaa0ead6e8a0a',
  };

  next();
});
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'По указанному пути ничего не найдено.' });
});

app.listen(PORT);
