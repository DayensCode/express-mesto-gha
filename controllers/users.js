const userSchema = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  userSchema.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  userSchema.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Bad Request' });
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Card with _id cannot be found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.user._id;
  userSchema.findByIdAndUpdate({ name, about, userId }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { userId } = req.user._id;
  userSchema.findByIdAndUpdate({ avatar, userId }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data' });
      }
      return res.status(500).send({ message: err.message });
    });
};
