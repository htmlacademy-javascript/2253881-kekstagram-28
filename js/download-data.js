const STATUS_CODES_MIN_MAX = {
  MIN: 200,
  MAX: 300,
};

const downloadData = (onOk, onError, url) =>
  fetch(url)
    .then((res) => {
      if (
        res.status >= STATUS_CODES_MIN_MAX.MIN &&
        res.status < STATUS_CODES_MIN_MAX.MAX
      ) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((info) => onOk(info))
    .catch((err) => {
      onError(err);
    });

export default downloadData;
