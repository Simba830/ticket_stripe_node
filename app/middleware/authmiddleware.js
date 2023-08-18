const jwt = require('jsonwebtoken');

// Middleware function for JWT authentication
const authMiddleware = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  let token = authHeader;
  // Check if the authorization header is present
  if (authHeader) {

    if (authHeader.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }
    // Extract the JWT token from the authorization header

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, '123');

      // Attach the decoded user information to the request object
      req.user = decoded;

      // Allow access to the next middleware or route handler
      next();
    } catch (error) {
      // Invalid token
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    // Authorization header is missing
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;