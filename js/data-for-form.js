export const ESC_BUTTON_CODE = 'Escape';
export const COUNT_OF_SYMBOLS_TEXTAREA = 140;
export const STEP_25 = 25;
export const STEP_100 = 100;
export const COUNT_FOR_CAGES = 5;
export const loadImgElem = document.querySelector('#upload-file');
export const formEditedImgElem = document.querySelector('.img-upload__overlay');
export const imgFromFormElem = formEditedImgElem.querySelector('img');
export const closeFormElem = formEditedImgElem.querySelector('#upload-cancel');
export const allPicksElem =
  formEditedImgElem.querySelectorAll('.effects__preview');
export const makeSmallerElem = formEditedImgElem.querySelector(
  '.scale__control--smaller'
);
export const makeBiggerElem = formEditedImgElem.querySelector(
  '.scale__control--bigger'
);

export const inputOfScale = formEditedImgElem.querySelector(
  '.scale__control--value'
);
export const inputHashtagElem = document.querySelector('.text__hashtags');
export const buttonSubmitElem = formEditedImgElem.querySelector(
  '.img-upload__submit'
);
export const commentAreaElem =
  formEditedImgElem.querySelector('.text__description');
