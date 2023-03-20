const renderFullPick = (evt, mainPickElem) => {
  evt.preventDefault();
  const { url, description, likes, comments } = mainPickElem;
  const ESC_BUTTON_CODE = 27;
  const SIZE_OF_AVATARS = {
    WIDTH: 35,
    HEIGHT: 35,
  };
  const STEP = 5;
  let counterLoader = 5;
  let loadedArrayOfComments = comments.slice(0, counterLoader);

  document.body.classList.add('modal-open');

  const commetsCounterElem = document.querySelector('.social__comment-count');

  const commentElem = document.createElement('li');

  const buttomLoadMoarCommentsElem = document.querySelector('.comments-loader');

  commetsCounterElem.innerHTML = `${loadedArrayOfComments.length} из <span class="comments-count">${comments.length}</span> комментариев`;
  const fullPickWindowElem = document.querySelector('.big-picture');
  const closeButtonElem = fullPickWindowElem.querySelector('#picture-cancel');
  const windowForCommentsElem =
    fullPickWindowElem.querySelector('.social__comments');
  windowForCommentsElem.innerHTML = '';

  if (comments.length < counterLoader) {
    buttomLoadMoarCommentsElem.classList.add('hidden');
  } else {
    buttomLoadMoarCommentsElem.classList.remove('hidden');
  }

  // eslint-disable-next-line
  const loaderComments = (evt) => {
    evt.preventDefault();

    counterLoader += STEP;
    loadedArrayOfComments = comments.slice(0, counterLoader);
    windowForCommentsElem.innerHTML = '';
    loadedArrayOfComments.forEach((elem) => {
      const cloneOfCommentElem = commentElem.cloneNode(true);
      cloneOfCommentElem.children[0].src = elem.avatar;
      cloneOfCommentElem.children[0].alt = elem.name;
      cloneOfCommentElem.children[1].textContent = elem.message;
      windowForCommentsElem.append(cloneOfCommentElem);
    });
    commetsCounterElem.innerHTML = `${loadedArrayOfComments.length} из <span class="comments-count">${comments.length}</span> комментариев`;
    if (comments.length <= counterLoader) {
      buttomLoadMoarCommentsElem.classList.add('hidden');
    }
  };

  // eslint-disable-next-line
  const closeFullPickOnEsc = (evt) => {
    if (evt.keyCode === ESC_BUTTON_CODE) {
      fullPickWindowElem.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', closeFullPickOnEsc);
      closeButtonElem.removeEventListener('click', closeFullPickElem);
      buttomLoadMoarCommentsElem.removeEventListener('click', loaderComments);
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
    buttomLoadMoarCommentsElem.removeEventListener('click', loaderComments);
    windowForCommentsElem.innerHTML = '';
  }

  closeButtonElem.addEventListener('click', closeFullPickElem);
  document.addEventListener('keydown', closeFullPickOnEsc);
  buttomLoadMoarCommentsElem.addEventListener('click', loaderComments);

  fullPickWindowElem.classList.remove('hidden');
  fullPickWindowElem.querySelector('.big-picture__img').children[0].src = url;
  fullPickWindowElem.querySelector('.likes-count').textContent = likes;
  fullPickWindowElem.querySelector('.comments-count').textContent =
    comments.length;

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

  loadedArrayOfComments.forEach((elem) => {
    const cloneOfCommentElem = commentElem.cloneNode(true);
    cloneOfCommentElem.children[0].src = elem.avatar;
    cloneOfCommentElem.children[0].alt = elem.name;
    cloneOfCommentElem.children[1].textContent = elem.message;
    windowForCommentsElem.append(cloneOfCommentElem);
  });
};

export default renderFullPick;
