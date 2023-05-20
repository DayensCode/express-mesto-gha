const usersRouter = require('express').Router();
const {
  getUser, getAllUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
