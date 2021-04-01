const getDataFromParam = (url, name, type) => {
  let result = type === 'array' ? [] : '';
  const params = url.substr(1).split("&");
  params.forEach((item) => {
    const key = item.split("=")[0];
    const value = item.split("=")[1];
    if (key === name && type === 'array') {
      result = [...result, decodeURIComponent(value)];
    } else if (key === name) {
      result = decodeURIComponent(value);
    }
  });
  return result;
}
export default getDataFromParam