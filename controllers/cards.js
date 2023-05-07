const cardSchema = require('../models/card');

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

module.exports.getAllCards = (req, res) => {
  cardSchema.find({})
    .populate(['owner', 'likes'])
    .then((cards) => handleSuccessfulRequest(res, { data: cards }))
    .catch((err) => handleDefaultError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardSchema.create({ name, link, owner })
    .populate(['owner', 'likes'])
    .then((card) => handleSuccessfulRequest(res, card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        handleValidationError(err, res);
      } else {
        handleDefaultError(err, res);
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  cardSchema.findByIdAndRemove(cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return handleNotFoundError(res);
      }
      return handleSuccessfulRequest(res, card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        handleValidationError(res);
      }
      return handleDefaultError(err, res);
    });
};

module.exports.addLike = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return handleNotFoundError(res);
      }
      return handleSuccessfulRequest(res, card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        handleValidationError(res);
      }
      return handleDefaultError(err, res);
    });
};

module.exports.deleteLike = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        return handleNotFoundError(res);
      }
      return handleSuccessfulRequest(res, card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        handleValidationError(res);
      }
      return handleDefaultError(err, res);
    });
};
