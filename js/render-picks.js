import renderFullPick from './render-full-pick.js';
const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const DELAY = {
  MAIN: 500,
  ERROR: 5000,
};

//дебаунс
export const debouncing = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//отрисовка картинок в документ
export const renderPicksIntoWindow = (arrOfPicks) => {
  ////очистка картинок перед новым рендером
  const mainWindowPickElem = document.querySelector('.pictures');
  const picksElems = mainWindowPickElem.querySelectorAll('.picture');
  picksElems.forEach((elem) => {
    elem.remove();
  });
  //-----
  const templatePicElem = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const fragmentForPicsElem = document.createDocumentFragment();
  //перебор массива с данными + рендер данных
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
//ОтдебауУУУУШЕННАЯ рендерка картинок
const debouncedRenderPicksIntoWindow = debouncing(
  renderPicksIntoWindow,
  DELAY.MAIN
);

//Рандомное число
const getRandomArbitrary = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

//10 рандомных элементов из основного массива
export const cutTenRandomElemsFromArr = (arr) => {
  const ids = [];

  for (let i = 0; i < 10; i++) {
    let number = getRandomArbitrary(0, arr.length);
    while (ids.includes(number)) {
      number = getRandomArbitrary(0, arr.length);
    }
    ids.push(number);
  }

  return ids.map((elem) => arr[elem]);
};

//удаляет активный класс на клик и добавляет на тардет кнопку.
const clearClassActiveButton = (buttonsArr, target) => {
  buttonsArr.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  target.target.classList.add('img-filters__button--active');
};

//основная функция
export const renderPicksOnOk = (arrOfSmth) => {
  //показываем верхнюю панель
  const filterElem = document.querySelector('.img-filters');
  filterElem.classList.remove('img-filters--inactive');
  //--------
  const buttonsFilterElem = filterElem.querySelectorAll('button');

  // отрисовка пикч под дибаунсом
  buttonsFilterElem.forEach((elem) => {
    elem.onclick = (evt) => {
      switch (evt.target.id) {
        case FILTERS.DEFAULT: {
          clearClassActiveButton(buttonsFilterElem, evt);
          debouncedRenderPicksIntoWindow(arrOfSmth);

          break;
        }

        case FILTERS.RANDOM: {
          clearClassActiveButton(buttonsFilterElem, evt);
          debouncedRenderPicksIntoWindow(cutTenRandomElemsFromArr(arrOfSmth));
          break;
        }
        case FILTERS.DISCUSSED: {
          clearClassActiveButton(buttonsFilterElem, evt);
          debouncedRenderPicksIntoWindow(
            [...arrOfSmth].sort((a, b) => b.comments.length - a.comments.length)
          );
          break;
        }
        default: {
          break;
        }
      }
    };
  });
  renderPicksIntoWindow(arrOfSmth);
};

//действия при ошибке загрузки картинок с сервера
export const renderPicksOnError = (errorMessage) => {
  const errorWindowElem = document.querySelector('#window-error');
  errorWindowElem.children[0].textContent = errorMessage;
  errorWindowElem.classList.remove('hidden');
  //eslint-disable-next-line
  const timer = setTimeout(() => {
    errorWindowElem.classList.add('hidden');
  }, DELAY.ERROR);
};
