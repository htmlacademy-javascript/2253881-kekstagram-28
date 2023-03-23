import { renderPicksOnOk, renderPicksOnError } from './render-picks.js';
import editorForm from './form.js';

const URL = 'https://28.javascript.pages.academy/kekstagram/data';

const STATUS_CODES_MIN_MAX = {
  MIN: 200,
  MAX: 300,
};

const downloadData = async () => {
  try {
    const res = await fetch(URL);
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

renderPicksOnOk(data);

editorForm();
