function getUserProfile({ id, email, username, firstname, lastname }) {
  return { id, email, username, firstname, lastname };
}

module.exports = {
  getUserProfile,
};
