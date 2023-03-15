import {
  ESC_BUTTON_CODE,
  COUNT_OF_SYMBOLS_TEXTAREA,
  STEP_100,
  STEP_25,
  COUNT_FOR_CAGES,
  loadImgElem,
  formEditedImgElem,
  imgFromFormElem,
  closeFormElem,
  allPicksElem,
  makeBiggerElem,
  makeSmallerElem,
  inputOfScale,
  inputHashtagElem,
  buttonSubmitElem,
  commentAreaElem,
} from './data-for-form.js';

const editorForm = () => {
  const pristine = new Pristine(document.querySelector('.img-upload__form'));

  const validateHashTag = (val) => {
    const regexp = /^(#[a-zа-яё0-9]{1,19}\s)*#[a-zа-яё0-9]{1,19}$/gi;
    return regexp.test(val) || val === '';
  };

  pristine.addValidator(inputHashtagElem, validateHashTag);

  inputHashtagElem.oninput = () => {
    // const countOfCages = inputHashtagElem.value
    //   .split('')
    //   .reduce((acc, elem) => (elem === '#' ? (acc += 1) : acc), 0);
    const countOfCages = inputHashtagElem.value.replace(/[^#]/g, '').length;
    if (pristine.validate() && countOfCages <= COUNT_FOR_CAGES) {
      buttonSubmitElem.disabled = false;
    } else {
      buttonSubmitElem.disabled = true;
    }
  };

  commentAreaElem.oninput = (evt) => {
    if (evt.target.value.length <= COUNT_OF_SYMBOLS_TEXTAREA) {
      buttonSubmitElem.disabled = false;
    } else {
      buttonSubmitElem.disabled = true;
    }
  };

  imgFromFormElem.style.transform = 'scale(1)';

  makeSmallerElem.onclick = (evt) => {
    evt.preventDefault();
    if (Number(inputOfScale.value.replace(/\D/g, '')) - STEP_25 > 0) {
      inputOfScale.value = `${
        Number(inputOfScale.value.replace(/\D/g, '')) - STEP_25
      }%`;
      imgFromFormElem.style.transform = `scale(${inputOfScale.value})`;
    }
  };

  makeBiggerElem.onclick = (evt) => {
    evt.preventDefault();
    if (Number(inputOfScale.value.replace(/\D/g, '')) < STEP_25) {
      inputOfScale.value = `${
        Number(inputOfScale.value.replace(/\D/g, '')) + STEP_100
      }%`;
      imgFromFormElem.style.transform = `scale(${inputOfScale.value})`;
    }
  };

  document.onkeydown = (evt) => {
    if (
      evt.key === ESC_BUTTON_CODE &&
      evt.target.className !== 'text__hashtags' &&
      evt.target.className !== 'text__description'
    ) {
      formEditedImgElem.classList.add('hidden');
      document.body.classList.remove('modal-open');
      loadImgElem.value = '';
      imgFromFormElem.style.transform = 'scale(1)';
      inputOfScale.value = '100%';
    }
  };

  closeFormElem.onclick = (evt) => {
    evt.preventDefault();
    formEditedImgElem.classList.add('hidden');
    document.body.classList.remove('modal-open');
    loadImgElem.value = '';
    imgFromFormElem.style.transform = 'scale(1)';
    inputOfScale.value = '100%';
  };

  loadImgElem.onchange = (evt) => {
    evt.preventDefault();
    formEditedImgElem.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const fileReader = new FileReader();
    fileReader.onload = () => {
      imgFromFormElem.src = `${fileReader.result}`;
      allPicksElem.forEach((elem) => {
        elem.style.backgroundImage = `url(${fileReader.result})`;
      });
    };

    fileReader.readAsDataURL(evt.target.files[0]);
  };
};

export default editorForm;
