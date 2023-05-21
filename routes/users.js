const usersRouter = require('express').Router();
const {
  getUser, getAllUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

const { updateProfileValidation, updateAvatarValidation, userIdValidation } = require('../middlewares/validation');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', userIdValidation, getUserById);
usersRouter.patch('/me', updateProfileValidation, updateProfile);
usersRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = usersRouter;
