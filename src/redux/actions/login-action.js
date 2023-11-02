export const login = (username, password) => {
  console.log("login get", username, password);
  return {
    type: "LOGIN",
    payload: { username, password },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
