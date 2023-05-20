const jwt = require('jsonwebtoken');

const UNAUTHORIZED_ERROR = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UNAUTHORIZED_ERROR('You need to log in');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UNAUTHORIZED_ERROR('You need to log in'));
  }
  req.user = payload;
  return next();
};
