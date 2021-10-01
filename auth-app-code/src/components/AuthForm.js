import React, { Fragment,   useState, useContext} from "react";
import { Link } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../store/auth-context";
const AuthForm = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccessMsg] = useState(null);
  //const history = useHistory();
  
  const authCtx = useContext(AuthContext);
  
  if(authCtx.isLoggedIn){
    
     window.location.href="http://localhost:3000";
  }

  const emailInputHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(emailInput + " " + passwordInput);
    if (emailInput === "" || passwordInput === "") {
      setError("All inputs are mandatory");
      return;
    }
    setError(null);
    fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((responce) => responce.json())
      .then((data) => {
        console.log(data);
        const status = data["status"];
        const message = data["message"];

        if (status === 404 || status === 406) {
          setError(message);
          setSuccessMsg(null);
        }
        if (status === 202) {
          setError(null);
          setSuccessMsg(message);
         authCtx.login(emailInput);
          //window.location.href="http://localhost:3000";
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Fragment>
      <h1 className={classes.title}> Login Page </h1>
      {error ? <p className={classes.error}>{error}</p> : ""}
      {success && <p className={classes.success}>{success}</p>}
      <div className={classes.formDiv}>
        <form onSubmit={submitHandler}>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              value={emailInput}
              id="username"
              type="email"
              onChange={emailInputHandler}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={passwordInput}
              type="text"
              onChange={passwordInputHandler}
            />

            <button className={classes.button} type="submit">
              Login
            </button>
            <Link to="/register" className={classes.signupLink}>
              New User? Signup here
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AuthForm;
