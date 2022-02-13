function deepClone(obj) {
  if (obj instanceof Array) {
    return obj.map((value) => (value instanceof Object ? deepClone(value) : value));
  } else {
    const newObj = {};

    Object.entries(obj).forEach(([prop, value]) => {
      newObj[prop] = obj[prop] instanceof Object ? deepClone(value) : value;
    });

    return newObj;
  }
}

function shuffle(list = []) {
  const clonedlist = [...list];

  return clonedlist.sort(() => 0.5 - Math.random);
}

function getRandomSequence(length, chars = "AaBbCcDdEeFf0123456789") {
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function getRandomItems(list = [], max = 1) {
  const clonedlist = [...list];

  if (max > clonedlist.length) return clonedlist;
  if (clonedlist.length === 0) return clonedlist;

  const shuffledList = shuffle(clonedlist);
  const length = Math.floor(Math.random() * max);

  return Array.from({ length }, (v, k) => shuffledList.pop());
}

function getRandomIndex(list = []) {
  const clonedlist = [...list];

  if (clonedlist.length === 0) {
    throw new Error("List must not be empty");
  }

  return Math.floor(Math.random() * clonedlist.length);
}

function switchValueInList(list, value) {
  if (!(list instanceof Array)) {
    throw new Error("List must be an Array");
  }

  const index = list.indexOf(value);

  return index === -1 ? [...list, value] : list.splice(index, 1);
}

function parseBoolean(string) {
  if (string === "true") {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getRandomSequence,
  deepClone,
  shuffle,
  getRandomItems,
  getRandomIndex,
  switchValueInList,
  parseBoolean,
};
