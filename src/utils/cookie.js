import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = (name) => {
  return cookies.get(name);
};

export const setCookie = ({ name, value, time }) => {
  const valueToJson = JSON.stringify(value);
  let options = { path: '/', sameSite: true };

  if (time) {
    options.maxAge = time;
  }

  cookies.set(name, valueToJson, options);
};
