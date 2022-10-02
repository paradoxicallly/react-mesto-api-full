const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors, Joi, celebrate } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 4000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {});
mongoose.set('toObject', { useProjection: true });
mongoose.set('toJSON', { useProjection: true });

// логирование запросов
app.use(requestLogger);

app.use(cors());

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

// обработка роутов
app.use('*', (req, res, next) => {
  next(new NotFoundError('Роут не найден'));
});
// логирование ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// обработка ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
