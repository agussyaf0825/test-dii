const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {
  const jwtSecret = process.env.JWT_ACESS_TOKEN_KEY;
  try {
    // Extract authentication token
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please provide either an Authorization header (Bearer <token>)',
      });
    }

    if (token) {
      const parts = token?.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.tokenType !== 'access' && req.originalUrl !== '/api/auth/select-role') {
      return res.status(403).json({
        success: false,
        needSelectRole: true,
        message: 'Please select role first',
      });
    }

    // Attach user information and authentication details to request
    req.user = decoded;
    req.accessToken = token;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(500).json({
        success: false,
        message: 'Please use your Login new access token',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(500).json({
        success: false,
        message: 'The provided access token is not valid',
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  authorization,
};
