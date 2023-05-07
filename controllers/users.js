const userSchema = require('../models/user');

const handleValidationError = (res) => {
  res.status(400).send({ message: 'Invalid data' });
};

const handleNotFoundError = (res) => {
  res.status(404).send({ message: 'Not found' });
};

const handleDefaultError = (err, res) => {
  res.status(500).send({ message: err.message });
};

const handleSuccessfulRequest = (res, user) => {
  res.status(200).send(user);
};

module.exports.getAllUsers = (req, res) => {
  userSchema.find({})
    .then((users) => handleSuccessfulRequest(res, { data: users }))
    .catch((err) => handleDefaultError(err, res));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  userSchema.findById(userId)
    .orFail()
    .then((user) => handleSuccessfulRequest(res, { data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return handleValidationError(res);
      }
      if (err.name === 'DocumentNotFoundError') {
        return handleNotFoundError(res);
      }
      return handleDefaultError(err, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema.create({ name, about, avatar })
    .then((user) => handleSuccessfulRequest(res, user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(res);
      } else {
        handleDefaultError(err, res);
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => handleSuccessfulRequest(res, user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(res);
      }
      return handleDefaultError(err, res);
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => handleSuccessfulRequest(res, user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(res);
      }
      return handleDefaultError(err, res);
    });
};
