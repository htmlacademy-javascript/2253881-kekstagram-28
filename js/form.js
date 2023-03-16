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
  effectRadioButtonsElems,
  sliderContainerElem,
  containerForInputSlider,
  valueOfSlider,
  CHROME,
  SEPIA,
  MARVIN,
  PHOBOS,
  HEAT,
} from './data-for-form.js';

const editorForm = () => {
  const pristine = new Pristine(document.querySelector('.img-upload__form'));

  const validateHashTag = (val) => {
    const regexp = /^(#[a-zа-яё0-9]{1,19}\s)*#[a-zа-яё0-9]{1,19}$/gi;
    return regexp.test(val) || val === '';
  };

  const clearOnClose = () => {
    formEditedImgElem.classList.add('hidden');
    document.body.classList.remove('modal-open');
    loadImgElem.value = '';
    imgFromFormElem.style.transform = 'scale(1)';
    inputOfScale.value = '100%';
    effectRadioButtonsElems[0].checked = true;
    imgFromFormElem.className = '';
    containerForInputSlider.classList.add('hidden');
    imgFromFormElem.style.filter = '';
  };

  pristine.addValidator(inputHashtagElem, validateHashTag);

  inputHashtagElem.oninput = () => {
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
    if (Number(inputOfScale.value.replace(/\D/g, '')) < STEP_100) {
      inputOfScale.value = `${
        Number(inputOfScale.value.replace(/\D/g, '')) + STEP_25
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
      clearOnClose();
    }
  };

  closeFormElem.onclick = (evt) => {
    evt.preventDefault();
    clearOnClose();
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

  // sliderContainerElem.classList.add('hidden');
  noUiSlider.create(sliderContainerElem, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
  });

  effectRadioButtonsElems.forEach((elem) => {
    elem.onchange = (evt) => {
      imgFromFormElem.className = '';
      imgFromFormElem.classList.add(`effects__preview--${evt.target.value}`);

      if (
        evt.target.value !== 'none' &&
        containerForInputSlider.classList.contains('hidden')
      ) {
        containerForInputSlider.classList.remove('hidden');
      }

      switch (evt.target.value) {
        case 'chrome': {
          sliderContainerElem.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          // imgFromFormElem.style.filter = '';
          imgFromFormElem.style.filter = `${CHROME}(1)`;

          break;
        }

        case 'sepia': {
          sliderContainerElem.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          // imgFromFormElem.style.filter = '';
          imgFromFormElem.style.filter = `${SEPIA}(1)`;
          break;
        }
        case 'marvin': {
          sliderContainerElem.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });
          // imgFromFormElem.style.filter = '';
          imgFromFormElem.style.filter = `${MARVIN}(100%)`;
          break;
        }
        case 'phobos': {
          sliderContainerElem.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          imgFromFormElem.style.filter = `${PHOBOS}(3px)`;

          break;
        }
        case 'heat': {
          sliderContainerElem.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          imgFromFormElem.style.filter = `${HEAT}(3)`;

          break;
        }
        default: {
          imgFromFormElem.style.filter = '';
          containerForInputSlider.classList.add('hidden');
          break;
        }
      }
    };
  });

  sliderContainerElem.noUiSlider.on('update', () => {
    valueOfSlider.value = sliderContainerElem.noUiSlider.get();

    effectRadioButtonsElems.forEach((elem) => {
      if (elem.checked === true) {
        switch (elem.value) {
          case 'chrome': {
            imgFromFormElem.style.filter = `${CHROME}(${valueOfSlider.value})`;
            break;
          }
          case 'sepia': {
            imgFromFormElem.style.filter = `${SEPIA}(${valueOfSlider.value})`;
            break;
          }
          case 'marvin': {
            imgFromFormElem.style.filter = `${MARVIN}(${valueOfSlider.value}%)`;
            break;
          }
          case 'phobos': {
            imgFromFormElem.style.filter = `${PHOBOS}(${valueOfSlider.value}px)`;
            break;
          }
          case 'heat': {
            imgFromFormElem.style.filter = `${HEAT}(${valueOfSlider.value})`;
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  });
};

export default editorForm;
