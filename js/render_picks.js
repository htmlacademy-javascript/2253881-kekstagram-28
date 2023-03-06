// eslint-disable-next-line
import arrOfSmth from './utils.js';

function addPicksToWindow() {
  const templatePic = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const fragmentForPics = document.createDocumentFragment();

  arrOfSmth.forEach((elem) => {
    const cloneTemplate = templatePic.cloneNode(true);
    cloneTemplate.children[0].src = elem.url;
    cloneTemplate.children[0].alt = elem.description;
    cloneTemplate.children[1].children[1].textContent = elem.likes;
    cloneTemplate.children[1].children[0].textContent = elem.comments.length;
    fragmentForPics.append(cloneTemplate);
  });

  const windowsToRenderPicks = document.querySelector('.pictures');
  windowsToRenderPicks.append(fragmentForPics);
}

export default addPicksToWindow;
