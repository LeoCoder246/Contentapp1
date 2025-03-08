require('dotenv').config(); 
const JWT = require('jsonwebtoken');


function createToken(user){
  const payload= {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1d',
  };
  return JWT.sign(payload, secret, options);
};

function verifyToken(token){
  const secret = process.env.JWT_SECRET;
  const decoded = JWT.verify(token, secret);
  return decoded;
}

module.exports = {createToken, verifyToken}