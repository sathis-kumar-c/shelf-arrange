import { useSelector } from "react-redux";

export const AdminIsLogged = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  console.log(isLoggedIn, user);
};
