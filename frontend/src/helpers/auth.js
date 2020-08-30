import cookie from "js-cookie";

export const setCookie = (key, value) => {
  if (process.browser) return cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key, value) => {
  if (process.browser) return cookie.remove(key);
};

export const getCookie = (key) => {
  if (process.browser) return cookie.get(key);
};

export const setLocalStorage = (key, value) => {
  if (process.browser) return localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  if (process.browser) return localStorage.removeItem(key);
};

export const getLocalStorage = (key) => {
  if (process.browser) return localStorage.getItem(key);
};

export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

export const isAuth = () => {
  //   localstorage에만 의존하지 않기 cookie도 항상 확인
  if (process.browser) {
    const cookieChecked = getCookie("token");

    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};
