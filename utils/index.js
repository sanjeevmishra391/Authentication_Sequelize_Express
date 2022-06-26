var jwt = require('jsonwebtoken');

function generateToken(user) {
  var u = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
    _id: user.id.toString(),
    isVerified: user.isVerified //used to prevent creating posts w/o verifying emails
  };

  return token = jwt.sign(u, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

//strips internal fields like password and verifyEmailToken etc
function getCleanUser(user) {
  if(!user) return {};

  var u = user.toJSON();
  return {
    _id: u._id,
    firstname: u.firstname,
    lastname: u.lastname,
    email: u.email,
    admin: u.admin,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
    isVerified: u.isVerified
  }
}

module.exports = {
  getCleanUser: getCleanUser,
  generateToken: generateToken
}