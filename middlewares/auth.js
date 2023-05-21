const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('You need to log in');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(UnauthorizedError('You need to log in'));
  }
  req.user = payload;
  return next();
};
