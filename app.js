const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const handleError = require('./middlewares/error');

const { PORT = 3000 } = process.env; // eslint-disable-line

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'По указанному пути ничего не найдено.' });
});

app.use(handleError);

app.listen(PORT);
