const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization || '';
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Invalid token' });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
};

module.exports = authenticationMiddleware;
