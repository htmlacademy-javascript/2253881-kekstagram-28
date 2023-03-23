import { renderPicksOnOk, renderPicksOnError } from './render-picks.js';
import editForm from './form.js';
import { loadImgElem } from './data-for-form.js';
import { debouncing } from './render-picks.js';

const messageError = 'Ошибка сервера';

export const URLS = {
  URL_SEND: 'https://28.javascript.pages.academy/kekstagram',
  URL_MAIN: 'https://28.javascript.pages.academy/kekstagram/data',
};

const STATUS_CODES_MIN_MAX = {
  MIN: 200,
  MAX: 300,
};

const RenderDebouncedPicksOnError = debouncing(renderPicksOnError, 500);

const downloadData = async () => {
  try {
    const res = await fetch(URLS.URL_MAIN);
    if (
      res.status >= STATUS_CODES_MIN_MAX.MIN &&
      res.status < STATUS_CODES_MIN_MAX.MAX
    ) {
      const ans = await res.json();
      return ans;
    } else {
      throw res.statusText;
    }
  } catch (error) {
    renderPicksOnError(error);
  }
};

const data = await downloadData();

if (data !== undefined) {
  renderPicksOnOk(data);
  editForm();
} else {
  loadImgElem.type = 'button';
  loadImgElem.onclick = () => {
    RenderDebouncedPicksOnError(messageError);
  };
}
