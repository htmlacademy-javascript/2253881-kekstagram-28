import { NAMES, MESSAGES, DESCRIPTIONS } from './data.js';

const arrOfSmth = [];

const getRandomNumGenerator = (a, b) =>
  Math.floor(Math.random() * (b - a + 1) + a);

const getUniqNumberGenerator = (num1, num2, fieldOfObj, arr) => {
  let uniqRandNum = getRandomNumGenerator(num1, num2);
  while (!arr.every((elem) => elem[fieldOfObj] !== uniqRandNum)) {
    uniqRandNum = getRandomNumGenerator(num1, num2);
  }
  return uniqRandNum;
};

const getUniqPhotoIdGenerator = (num1, num2) => {
  let uniqRandNum = getRandomNumGenerator(num1, num2);
  while (
    !arrOfSmth.every(
      (elem) => Number(elem.url.replace(/\D/g, '')) !== uniqRandNum
    )
  ) {
    uniqRandNum = getRandomNumGenerator(num1, num2);
  }
  return uniqRandNum;
};

const getUniqCommentsGenerator = () => {
  const arrOfComments = [];
  const count = getRandomNumGenerator(0, 300);
  for (let i = 0; i < count; i++) {
    const comment = {
      id: getUniqNumberGenerator(0, count, 'id', arrOfComments),
      avatar: `img/avatar-${getRandomNumGenerator(1, 6)}.svg`,
      message: MESSAGES[getRandomNumGenerator(0, MESSAGES.length - 1)],
      name: NAMES[getRandomNumGenerator(0, NAMES.length - 1)],
    };
    arrOfComments.push(comment);
  }

  return arrOfComments;
};

const generateObj = () => ({
  id: getUniqNumberGenerator(1, 25, 'id', arrOfSmth),
  url: `photos/${getUniqPhotoIdGenerator(1, 25)}.jpg`,
  description: DESCRIPTIONS[getRandomNumGenerator(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumGenerator(15, 200),
  comments: getUniqCommentsGenerator(),
});

// arrOfSmth = Array.from({ length: 15 }, generateObj);
for (let i = 0; i < 25; i++) {
  arrOfSmth.push(generateObj());
}

export default arrOfSmth;
