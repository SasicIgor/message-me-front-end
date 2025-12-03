export const setAccessCookie = (value: string) => {
  const ms = 15 * 60 * 1000;
  const expires = new Date(Date.now() + ms).toUTCString();
  console.log(expires);
  document.cookie = `token=${value}; expires=${expires}`;
};

export const getAccesCookie = () => {
  const accessCookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("token="))?.slice(6);
    return accessCookie
};
