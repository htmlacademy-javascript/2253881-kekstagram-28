//import arrOfSmth from './utils.js';

import { renderPicksOnOk, renderPicksOnError } from './render-picks.js';
import editorForm from './form.js';
import downloadData from './download-data.js';

// renderPicksIntoWindow();
downloadData(
  renderPicksOnOk,
  renderPicksOnError,
  'https://28.javascript.pages.academy/kekstagram/data'
);

editorForm();
