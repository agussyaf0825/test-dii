const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateAccessToken = (userData) => {
  const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '15m';
  const jwtScret = process.env.JWT_ACESS_TOKEN_KEY;
  return jwt.sign(
    {
      id: userData.id,
      username: userData.username,
      fullName: userData.fullName,
      roles: userData.roles,
      tokenType: userData.tokenType || 'access',
    },
    jwtScret,
    { expiresIn: accessTokenExpiry }
  );
};

const passwordDecrypt = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Password verification failed');
  }
};

module.exports = {
  generateAccessToken,
  passwordDecrypt,
};
