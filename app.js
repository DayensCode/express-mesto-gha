const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const {
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({ extended: true }),
);

app.use((req, res, next) => {
  req.user = {
    _id: '6454d91058d86f1953a222cc',
  };
  next();
});

app.use(router);

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
