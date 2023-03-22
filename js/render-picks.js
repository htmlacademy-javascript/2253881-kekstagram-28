import renderFullPick from './render-full-pick.js';
const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

//отрисовка картинок в документ
const renderPicksIntoWindow = (arrOfPicks) => {
  const templatePicElem = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const fragmentForPicsElem = document.createDocumentFragment();

  arrOfPicks.forEach((elem) => {
    const cloneTemplateElem = templatePicElem.cloneNode(true);
    cloneTemplateElem.children[0].src = elem.url;
    cloneTemplateElem.children[0].alt = elem.description;
    cloneTemplateElem.children[1].children[1].textContent = elem.likes;
    cloneTemplateElem.children[1].children[0].textContent =
      elem.comments.length;
    cloneTemplateElem.addEventListener('click', (evt) =>
      renderFullPick(evt, elem)
    );
    fragmentForPicsElem.append(cloneTemplateElem);
  });

  const windowToRenderPicksElem = document.querySelector('.pictures');
  windowToRenderPicksElem.append(fragmentForPicsElem);
};

//удаляет активный класс на клик и добавляет на тардет кнопку.
const cleanerClassActiveButton = (buttonsArr, target) => {
  buttonsArr.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  target.target.classList.add('img-filters__button--active');
};
//Рандомное число
const getRandomArbitrary = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

//10 рандомных элементов из основного массива
const cutTenRandomElemsFromArr = (arr) => {
  let arrOfIndexs = [];

  for (let i = 0; i < 10; i++) {
    let number = getRandomArbitrary(0, arr.length);
    while (arrOfIndexs.includes(number)) {
      number = getRandomArbitrary(0, arr.length);
    }
    arrOfIndexs.push(number);
  }

  return arrOfIndexs.map((elem) => arr[elem]);
};

//очистка картинок перед новым рендером
const cleaningBeforeRender = () => {
  const mainWindowPickElem = document.querySelector('.pictures');
  const picksElems = mainWindowPickElem.querySelectorAll('.picture');
  picksElems.forEach((elem) => {
    elem.remove();
  });
};

//основная функция
export const renderPicksOnOk = (arrOfSmth) => {
  const filterElem = document.querySelector('.img-filters');
  filterElem.classList.remove('img-filters--inactive');
  const buttonsFilterElem = filterElem.querySelectorAll('button');

  cutTenRandomElemsFromArr(arrOfSmth);

  buttonsFilterElem.forEach((elem) => {
    elem.onclick = (evt) => {
      switch (evt.target.id) {
        case FILTERS.DEFAULT: {
          cleanerClassActiveButton(buttonsFilterElem, evt);
          cleaningBeforeRender();
          renderPicksIntoWindow(arrOfSmth);
          break;
        }

        case FILTERS.RANDOM: {
          cleanerClassActiveButton(buttonsFilterElem, evt);
          const tenArrElems = cutTenRandomElemsFromArr(arrOfSmth);
          cleaningBeforeRender();
          renderPicksIntoWindow(tenArrElems);
          break;
        }
        case FILTERS.DISCUSSED: {
          cleanerClassActiveButton(buttonsFilterElem, evt);
          break;
        }
        default: {
          break;
        }
      }
    };
  });
  renderPicksIntoWindow(arrOfSmth);

  // const templatePicElem = document
  //   .querySelector('#picture')
  //   .content.querySelector('.picture');

  // const fragmentForPicsElem = document.createDocumentFragment();

  // arrOfSmth.forEach((elem) => {
  //   const cloneTemplateElem = templatePicElem.cloneNode(true);
  //   cloneTemplateElem.children[0].src = elem.url;
  //   cloneTemplateElem.children[0].alt = elem.description;
  //   cloneTemplateElem.children[1].children[1].textContent = elem.likes;
  //   cloneTemplateElem.children[1].children[0].textContent =
  //     elem.comments.length;
  //   cloneTemplateElem.addEventListener('click', (evt) =>
  //     renderFullPick(evt, elem)
  //   );
  //   fragmentForPicsElem.append(cloneTemplateElem);
  // });

  // const windowToRenderPicksElem = document.querySelector('.pictures');
  // windowToRenderPicksElem.append(fragmentForPicsElem);
};

//действия при ошибке загрузки картинок с сервера
export const renderPicksOnError = (errorMessage) => {
  const errorWindowElem = document.querySelector('#window-error');
  errorWindowElem.children[0].textContent = errorMessage;
  errorWindowElem.classList.remove('hidden');
  // eslint-disable-next-line
  const timer = setTimeout(() => {
    errorWindowElem.classList.add('hidden');
  }, 3000);
};
