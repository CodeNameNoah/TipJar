const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization || '';
  try {
    const user = jwt.verify(token, 'secret');
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticationMiddleware;
