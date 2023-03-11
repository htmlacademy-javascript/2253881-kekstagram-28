import arrOfSmth from './utils.js';
import { renderFullPick } from './render-full-pick.js';

const renderPicksIntoWindow = () => {
  const templatePicElem = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const fragmentForPicsElem = document.createDocumentFragment();

  arrOfSmth.forEach((elem) => {
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

export default renderPicksIntoWindow;
