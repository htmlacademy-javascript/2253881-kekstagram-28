const downloadData = async (onOk, onError, url) =>
  await fetch(url)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
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
