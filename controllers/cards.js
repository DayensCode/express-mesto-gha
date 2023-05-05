const cardSchema = require('../models/card');

module.exports.getAllCards = (req, res) => {
  cardSchema.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardSchema.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  cardSchema.findById({ cardId })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Card with _id cannot be found' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.addLike = (req) => {
  const { cardId } = req.params;
  cardSchema.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true });
};

module.exports.deleteLike = (req) => {
  const { cardId } = req.params;
  cardSchema.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true });
};
