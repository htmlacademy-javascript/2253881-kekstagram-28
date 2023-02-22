const arrOfsmth = [];
const description = [
  'красивый',
  'мужественный',
  'милый',
  'симпотичный',
  'сильный',
  'умный',
  'легкий',
  'своенравный',
  'мощный',
  'веселый',
  'смешной',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Никитос',
  'Никиточка',
  'Ник',
  'Ника',
  'Никитян',
  'Мила',
  'Стас',
  'Вася',
  'Димон',
  'Андрей',
  'Стасян',
  'Женя',
  'Аня',
  'Юна',
];

function randomNumGenerator(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function uniqNumberGenerator(num1, num2, fieldOfObj, arr) {
  let uniqRandNum = randomNumGenerator(num1, num2);
  while (!arr.every((elem) => elem[fieldOfObj] !== uniqRandNum)) {
    uniqRandNum = randomNumGenerator(num1, num2);
  }
  return uniqRandNum;
}

function uniqPhotoIdGenerator(num1, num2) {
  let uniqRandNum = randomNumGenerator(num1, num2);
  while (
    !arrOfsmth.every(
      (elem) => Number(elem.url.replace(/\D/g, '')) !== uniqRandNum
    )
  ) {
    uniqRandNum = randomNumGenerator(num1, num2);
  }
  return uniqRandNum;
}

function uniqCommentsGenerator() {
  const arrOfComments = [];
  const count = randomNumGenerator(0, 300);
  for (let i = 0; i < count; i++) {
    const comment = {
      id: uniqNumberGenerator(0, count, 'id', arrOfComments),
      avatar: `img/avatar-${randomNumGenerator(0, 6)}.svg`,
      message: messages[randomNumGenerator(0, messages.length - 1)],
      name: names[randomNumGenerator(0, names.length - 1)],
    };
    arrOfComments.push(comment);
  }

  return arrOfComments;
}

function generatorObj() {
  return {
    id: uniqNumberGenerator(0, 25, 'id', arrOfsmth),
    url: `photos/${uniqPhotoIdGenerator(0, 25)}.jpg`,
    description: description[randomNumGenerator(0, description.length - 1)],
    likes: randomNumGenerator(15, 200),
    comments: uniqCommentsGenerator(),
  };
}

//arrOfsmth = Array.from({ length: 15 }, generatorObj);
for (let i = 0; i < 25; i++) {
  arrOfsmth.push(generatorObj());
}
