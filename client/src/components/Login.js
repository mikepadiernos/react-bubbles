import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// IMPORT UTILITIES
import { axiosWithAuth } from "../utilities/axiosWithAuth";

// IMPORT CONTEXTS
import LoggedContext from "../contexts/LoggedContext";

const Login = () => {

  const { logged, setLogged} = useContext(LoggedContext);

  let history = useHistory();

  const [ login, setLogin ] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", login)
      .then(response => {
        localStorage.setItem("token", response.data.payload);
        setLogin(login);
        setLogged(localStorage.getItem("token"));
        console.log("Really logged? ", logged);
        history.push("/bubbles");
      })
      .catch(error => {
        localStorage.removeItem("token");
        console.log("invalid login: ", error);
      });
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <div className="form-login">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-body">
            <label>Username:</label>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              value={login.username}
            />
          </div>
          <div className="form-body">
            <label>Password:</label>
            <input
              name="password"
              type="text"
              onChange={handleChange}
              value={login.password}
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </>
  );
};

export default Login;
