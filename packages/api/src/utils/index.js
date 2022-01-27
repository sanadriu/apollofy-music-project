function deepClone(obj) {
  if (obj instanceof Array) {
    return obj.map((value) =>
      value instanceof Object ? deepClone(value) : value,
    );
  } else {
    const newObj = {};

    Object.entries(obj).forEach(([prop, value]) => {
      newObj[prop] = obj[prop] instanceof Object ? deepClone(value) : value;
    });

    return newObj;
  }
}

function shuffle(list = []) {
  return list.sort(() => 0.5 - Math.random);
}

function getRandomSequence(length, chars = "AaBbCcDdEeFf0123456789") {
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

function getRandomItems(list = [], max = 1) {
  if (max > list.length) return list;
  if (list.length === 0) return list;

  const shuffledList = shuffle(list);
  const length = Math.floor(Math.random() * max);

  return Array.from({ length }, (v, k) => shuffledList.pop());
}

function getRandomIndex(list = []) {
  if (list.length === 0) {
    throw new Error("List must not be empty");
  }

  return Math.floor(Math.random() * list.length);
}

module.exports = {
  getRandomSequence,
  deepClone,
  shuffle,
  getRandomItems,
  getRandomIndex,
};
