export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => Boolean(getUser());

export const addUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));

export const logout = () => localStorage.removeItem("user");
