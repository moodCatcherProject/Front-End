import Cookies from "universal-cookie";
const cookies = new Cookies();

export const setCookie = (name, value, option = null) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = (name) => {
  return cookies.remove(name);
};

export const getToken = async () => {
  const token = getCookie("token");
  if (token) {
    return `Bearer ${token}`;
  } else {
    return null;
  }
};
