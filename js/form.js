const editorForm = () => {
  const loadImgElem = document.querySelector('#upload-file');
  const formEditedImgElem = document.querySelector('.img-upload__overlay');
  const imgFromFormElem = formEditedImgElem.querySelector('img');
  const closeFormElem = formEditedImgElem.querySelector('#upload-cancel');
  const allPicksElem = formEditedImgElem.querySelectorAll('.effects__preview');
  const makeSmallerElem = formEditedImgElem.querySelector(
    '.scale__control--smaller'
  );
  const makeBiggerElem = formEditedImgElem.querySelector(
    '.scale__control--bigger'
  );

  const inputOfScale = formEditedImgElem.querySelector(
    '.scale__control--value'
  );
  const inputHashtagElem = document.querySelector('.text__hashtags');
  const buttonSubmitElem = formEditedImgElem.querySelector(
    '.img-upload__submit'
  );
  const commentAreaElem = formEditedImgElem.querySelector('.text__description');
  const ESC_BUTTON_CODE = 27;

  const pristine = new Pristine(document.querySelector('.img-upload__form'));

  const validateHashTag = (val) => {
    const regexp = /^(#[a-zа-яё0-9]{1,19}\s)*#[a-zа-яё0-9]{1,19}$/gi;
    return regexp.test(val) || val === '';
  };

  pristine.addValidator(inputHashtagElem, validateHashTag);

  inputHashtagElem.oninput = () => {
    const countOfCages = inputHashtagElem.value
      .split('')
      .reduce((acc, elem) => {
        if (elem === '#') {
          acc++;
        }
        return acc;
      }, 0);

    if (pristine.validate() && countOfCages <= 5) {
      buttonSubmitElem.disabled = false;
    } else {
      buttonSubmitElem.disabled = true;
    }
  };

  commentAreaElem.oninput = (evt) => {
    if (evt.target.value.length <= 140) {
      buttonSubmitElem.disabled = false;
    } else {
      buttonSubmitElem.disabled = true;
    }
  };

  imgFromFormElem.style.transform = 'scale(1)';

  makeSmallerElem.onclick = (evt) => {
    evt.preventDefault();
    if (Number(inputOfScale.value.replace(/\D/g, '')) - 25 > 0) {
      inputOfScale.value = `${
        Number(inputOfScale.value.replace(/\D/g, '')) - 25
      }%`;
      imgFromFormElem.style.transform = `scale(${inputOfScale.value})`;
    }
  };

  makeBiggerElem.onclick = (evt) => {
    evt.preventDefault();
    if (Number(inputOfScale.value.replace(/\D/g, '')) < 100) {
      inputOfScale.value = `${
        Number(inputOfScale.value.replace(/\D/g, '')) + 25
      }%`;
      imgFromFormElem.style.transform = `scale(${inputOfScale.value})`;
    }
  };

  document.onkeydown = (evt) => {
    if (
      evt.keyCode === ESC_BUTTON_CODE &&
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
      imgFromFormElem.src = fileReader.result;
      allPicksElem.forEach((elem) => {
        elem.style.backgroundImage = `url(${fileReader.result})`;
      });
    };

    fileReader.readAsDataURL(evt.target.files[0]);
  };
};

export default editorForm;
