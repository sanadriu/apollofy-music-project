function getUserProfile(user) {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  };
}

module.exports = {
  getUserProfile,
};
