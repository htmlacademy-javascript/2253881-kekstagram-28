export const renderFullPick = (evt, mainPickElem) => {
  const { url, description, likes, comments } = mainPickElem;
  evt.preventDefault();
  const fullPickWindowElem = document.querySelector('.big-picture');
  fullPickWindowElem.classList.remove('hidden');
  fullPickWindowElem.querySelector('.big-picture__img').children[0].src = url;
  fullPickWindowElem.querySelector('.likes-count').textContent = likes;
  fullPickWindowElem.querySelector('.comments-count').textContent =
    comments.length;

  const commentElem = document.createElement('li');
  commentElem.classList.add('social__comment');

  const commentImgElem = document.createElement('img');
  commentImgElem.classList.add('social__picture');
  commentImgElem.width = '35';
  commentImgElem.height = '35';

  const commentPiElem = document.createElement('p');
  commentPiElem.classList.add('social__text');

  commentElem.append(commentImgElem);
  commentElem.append(commentPiElem);

  const windowForCommentsElem =
    fullPickWindowElem.querySelector('.social__comments');

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
