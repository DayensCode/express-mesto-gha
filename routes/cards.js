const cardsRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCardById, addLike, deleteLike,
} = require('../controllers/cards');

cardsRouter('/', getAllCards);
cardsRouter('/', createCard);
cardsRouter('/:cardId', deleteCardById);
cardsRouter('/:cardId/likes', addLike);
cardsRouter('/:cardId/likes', deleteLike);
