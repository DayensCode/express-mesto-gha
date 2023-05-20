const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');

const {
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({ extended: true }),
);
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(router);

app.use((err, req, res, next) => {
  const {
    status = 500,
    message,
  } = err;
  res.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
    await console.log(`App listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}

start();
