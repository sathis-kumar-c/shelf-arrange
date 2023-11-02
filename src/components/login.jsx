import axios from "axios";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../redux/actions/login-action";

const Login = () => {
  //login details
  const [details, setDetails] = useState({ username: "", password: "" });

  const [loader, setLoader] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  //login credentials
  const credentials = {
    username: "admin",
    password: "nits@123",
  };

  //navigate
  const navigate = useNavigate();

  //onchange
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    let check =
      details.username === credentials.username &&
      details.password === credentials.password;

    dispatch(login(details.username, details.password));

    if (details.username !== "" && details.password !== "") {
      try {
        if (check) {
          navigate("/shelf");
        } else {
          toast.error(`Incorrect credentials`, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setDetails({ username: "", password: "" });
      }
    } else {
      toast.error(`Enter Login Credentials`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }

    console.log("redux", isLoggedIn, user);
  };

  // Fetch data from API with authentication
  // const fetchData = async () => {
  //   setLoader(true);
  //   try {
  //     const res = await axios.post(
  //       "https://hemkumarnits-planogram.odoo.com/web/session/authenticate",
  //       {
  //         params: {
  //           db: "hemkumarnits-planogram-live-10057803",
  //           login: details.username, // Using the entered username from the input field
  //           password: details.password, // Using the entered password from the input field
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("res", res);

  //     if (res.status === 200) {
  //       // Authentication successful
  //       console.log("Authentication successful");
  //       navigate("/shelf");
  //     } else {
  //       // Authentication failed
  //       toast.error(`Incorrect credentials`, {
  //         position: toast.POSITION.BOTTOM_LEFT,
  //       });
  //     }
  //   } catch (err) {
  //     console.log("error", err);
  //     toast.error(`Error during login`, {
  //       position: toast.POSITION.BOTTOM_LEFT,
  //     });
  //   } finally {
  //     setDetails({ username: "", password: "" });
  //   }
  //   setLoader(false);
  // };

  return (
    <>
      <div className="login_whole">
        <div className="login_parent">
          <h2 style={{ textTransform: "uppercase" }}>Sign in</h2>

          <div className="">
            <InputGroup className="mb-3 ">
              <Form.Control
                className="input_login"
                placeholder="Enter username"
                aria-label="username"
                value={details?.username}
                name="username"
                onChange={(e) => handleOnChange(e)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                type="password"
                className="input_login"
                placeholder="Enter password"
                aria-label="password"
                value={details?.password}
                name="password"
                onChange={(e) => handleOnChange(e)}
              />
            </InputGroup>

            {loader === true ? (
              <div class="spinner-border text-primary" role="status" />
            ) : (
              <button className="login_btn" onClick={(e) => handleLogin(e)}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
