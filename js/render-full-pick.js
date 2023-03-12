const renderFullPick = (evt, mainPickElem) => {
  const { url, description, likes, comments } = mainPickElem;
  const escButtonCode = 27;
  const SIZE_OF_AVATARS = {
    WIDTH: 35,
    HEIGHT: 35,
  };

  document.body.classList.add('modal-open');

  evt.preventDefault();

  const fullPickWindowElem = document.querySelector('.big-picture');
  const closeButtonElem = fullPickWindowElem.querySelector('#picture-cancel');
  const windowForCommentsElem =
    fullPickWindowElem.querySelector('.social__comments');

  // eslint-disable-next-line
  const closeFullPickOnEsc = (evt) => {
    if (evt.keyCode === escButtonCode) {
      fullPickWindowElem.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', closeFullPickOnEsc);
      closeButtonElem.removeEventListener('click', closeFullPickElem);
      windowForCommentsElem.innerHTML = '';
    }
  };

  // eslint-disable-next-line
  function closeFullPickElem(evt) {
    evt.preventDefault();
    fullPickWindowElem.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closeFullPickOnEsc);
    closeButtonElem.removeEventListener('click', closeFullPickElem);
    windowForCommentsElem.innerHTML = '';
  }

  closeButtonElem.addEventListener('click', closeFullPickElem);
  document.addEventListener('keydown', closeFullPickOnEsc);

  fullPickWindowElem.classList.remove('hidden');
  fullPickWindowElem.querySelector('.big-picture__img').children[0].src = url;
  fullPickWindowElem.querySelector('.likes-count').textContent = likes;
  fullPickWindowElem.querySelector('.comments-count').textContent =
    comments.length;

  const commentElem = document.createElement('li');
  commentElem.classList.add('social__comment');

  const commentImgElem = document.createElement('img');
  commentImgElem.classList.add('social__picture');
  commentImgElem.width = SIZE_OF_AVATARS.WIDTH;
  commentImgElem.height = SIZE_OF_AVATARS.HEIGHT;

  const commentPiElem = document.createElement('p');
  commentPiElem.classList.add('social__text');

  commentElem.append(commentImgElem);
  commentElem.append(commentPiElem);

  fullPickWindowElem.querySelector('.social__caption').textContent =
    description;

  comments.forEach((elem) => {
    const cloneOfCommentElem = commentElem.cloneNode(true);
    cloneOfCommentElem.children[0].src = elem.avatar;
    cloneOfCommentElem.children[0].alt = elem.name;
    cloneOfCommentElem.children[1].textContent = elem.message;
    windowForCommentsElem.append(cloneOfCommentElem);
  });
};

export default renderFullPick;
