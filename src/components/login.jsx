import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  //login details
  const [details, setDetails] = useState({ username: "", password: "" });

  //login credentials
  const [credentials, setCredentials] = useState({
    username: "admin",
    password: "nits@123",
  });

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

  //login button
  const handleLogin = () => {
    console.log("login", details);

    let check =
      details.username == credentials.username &&
      details.password == credentials.password;

    try {
      if (check) {
        navigate("/shelf");
      } else {
        toast.error(`incorrect credentials`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setDetails({ username: "", password: "" });
    }
  };

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

            <button className="login_btn" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
