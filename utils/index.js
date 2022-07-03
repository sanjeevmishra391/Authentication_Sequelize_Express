//strips internal fields like password and verifyEmailToken etc
function getCleanUser(user) {
  if(!user) return {};

  var u = user.toJSON();
  return {
    id: u.id,
    firstname: u.firstName,
    lastname: u.lastName,
    email: u.email,
    dob: u.dob,
    countryCode: u.countryCode,
    mobile: u.mobile,
    isActive: u.isActive,
    isDeleted: u.isDeleted,
    isAdmin: u.isAdmin,
    isVerified: u.isVerified,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }
}

module.exports = { getCleanUser }