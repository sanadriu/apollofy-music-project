const faker = require("faker");
const { getRandomItems, getRandomIndex, getRandomSequence } = require("../utils");

function createSampleUser() {
  return {
    _id: getRandomSequence(28),
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    description: faker.lorem.paragraphs(1).substring(0, 250),
    birth_date: faker.date.past(18).toISOString().substring(0, 10),
    thumbnails: {
      url_default: faker.image.imageUrl(),
      url_medium: faker.image.imageUrl(),
      url_large: faker.image.imageUrl(),
    },
  };
}

function createSampleGenre() {
  return {
    name: `${faker.music.genre()} ${faker.commerce.productAdjective()} ${faker.commerce.color()}`,
    thumbnails: {
      url_default: faker.image.imageUrl(),
      url_medium: faker.image.imageUrl(),
      url_large: faker.image.imageUrl(),
    },
  };
}

function createSampleTrack(users = [], genres = []) {
  if (users.length === 0) {
    throw new Error("Users list must not be empty");
  }

  const user = users[getRandomIndex(users)];
  const selectedGenres = getRandomItems(genres, 3);

  return {
    user,
    title: faker.lorem.sentence(4),
    duration: faker.datatype.number({ min: 0, max: 600 }),
    released_date: faker.date.past().toISOString().substring(0, 10),
    color: faker.commerce.color(),
    genres: selectedGenres,
    url: faker.internet.url(),
    num_plays: faker.datatype.number({ min: 0, max: 1000000 }),
    thumbnails: {
      url_default: faker.image.imageUrl(),
      url_medium: faker.image.imageUrl(),
      url_large: faker.image.imageUrl(),
    },
  };
}

function createSampleAlbum(users = [], genres = []) {
  if (users.length === 0) {
    throw new Error("Users list must not be empty");
  }

  const user = users[getRandomIndex(users)];
  const selectedGenres = getRandomItems(genres, 3);

  return {
    user: user,
    title: faker.lorem.sentence(4),
    released_date: faker.date.past().toISOString().substring(0, 10),
    genres: selectedGenres,
    thumbnails: {
      url_default: faker.image.imageUrl(),
      url_medium: faker.image.imageUrl(),
      url_large: faker.image.imageUrl(),
    },
  };
}

function createSamplePlaylist(users = []) {
  if (users.length === 0) {
    throw new Error("Users list must not be empty");
  }

  const user = users[getRandomIndex(users)];

  return {
    user,
    title: faker.lorem.sentence(4),
    description: faker.lorem.paragraphs(1).substring(0, 250),
    color: faker.commerce.color(),
    thumbnails: {
      url_default: faker.image.imageUrl(),
      url_medium: faker.image.imageUrl(),
      url_large: faker.image.imageUrl(),
    },
  };
}

module.exports = {
  createSampleUser,
  createSampleGenre,
  createSampleTrack,
  createSampleAlbum,
  createSamplePlaylist,
};
