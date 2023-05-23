const userSchema = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

module.exports.getUser = (req, res, next) => {
  userSchema.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User cannot be found');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(NotFoundError('User cannot be found'));
      } else {
        next(err);
      }
    });
};

module.exports.getAllUsers = (req, res, next) => {
  userSchema.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  userSchema.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User cannot be found');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User cannot be found');
      } else {
        res.status(200).send(user);
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userSchema.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(200).send(user))
    .catch(next);
};
