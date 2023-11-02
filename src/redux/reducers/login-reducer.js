const initialState = { isLoggedIn: false, user: null };

const loginReducer = (state = initialState, action) => {
  console.log("loginReducer", action, state);
  switch (action.type) {
    case "LOGIN":
      console.log("LOGIN");
      if (
        action.payload.username == "admin" &&
        action.payload.password == "nits@123"
      ) {
        console.log("trueeeeeee");
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload.username,
        };
      } else {
        console.log("falseeee");
        return state;
      }
    case "LOGOUT":
      console.log("LOGOUT");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
