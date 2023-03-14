const editorForm = () => {
  const loadImgElem = document.querySelector('#upload-file');
  const formEditedImgElem = document.querySelector('.img-upload__overlay');
  const imgFromFormElem = formEditedImgElem.querySelector('img');
  const closeFormElem = formEditedImgElem.querySelector('#upload-cancel');
  const allPicksElem = formEditedImgElem.querySelectorAll('.effects__preview');
  const ESC_BUTTON_CODE = 'Escape';

  document.onkeydown = (evt) => {
    evt.preventDefault();
    if (evt.code === ESC_BUTTON_CODE) {
      formEditedImgElem.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };

  closeFormElem.onclick = (evt) => {
    evt.preventDefault();
    formEditedImgElem.classList.add('hidden');
    document.body.classList.remove('modal-open');
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
