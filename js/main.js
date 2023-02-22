let arrOfsmth = [];

function randomNumGenerator(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function uniqNumberGenerator(num1, num2) {
  let uniqRandNum = randomNumGenerator(num1, num2);
  while (!arrOfsmth.every((elem) => elem.id !== uniqRandNum)) {
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

function generatorObj() {
  return {
    id: uniqNumberGenerator(0, 25),
    url: `photos/${uniqPhotoIdGenerator(0, 25)}.jpg`,
  };
}

//arrOfsmth = Array.from({ length: 15 }, generatorObj);
for (let i = 0; i < 25; i++) {
  arrOfsmth.push(generatorObj());
}
console.log(arrOfsmth.sort((a, b) => a.id - b.id));
console.log(
  arrOfsmth.sort((a, b) =>
    Number(a.url.replace(/\D/g, '') - Number(b.url.replace(/\D/g, '')))
  )
);
