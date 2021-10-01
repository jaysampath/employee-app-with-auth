import { Fragment, useState } from "react";
import classes from "./NewUserForm.module.css";
import { Link } from "react-router-dom";
const NewUserForm = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const emailInputHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const usernameInputHandler = (event) => {
    setUsernameInput(event.target.value);
  };

  const confrimPasswordInputHandler = (event) => {
    setConfirmPasswordInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //console.log(emailInput, usernameInput, passwordInput, confirmPasswordInput);
    if (
      emailInput === "" ||
      passwordInput === "" ||
      confirmPasswordInput === "" ||
      usernameInput === ""
    ) {
      setError("All Inputs are mandatory");
      return;
    }
    setError(null);
    if (passwordInput !== confirmPasswordInput) {
      setError("password and confirm password aren't equal");
      return;
    }
    setError(null);
    fetch("http://localhost:8080/new-user", {
      method: "POST",
      body: JSON.stringify({
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();;
      })
      .then((data) => {
        console.log(data);
        if (data['status']!==202) {
          setSuccessMsg(null);
          setError(
            data['message']
          );
          
        } else {
          setError(null);
          setSuccessMsg(data['message']);
          setEmailInput('');
          setConfirmPasswordInput('');
          setPasswordInput('');
          setUsernameInput('');
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  return (
    <Fragment>
      <h1 className={classes.title}> New User Registration </h1>
      {error ? <p className={classes.error}>{error}</p> : ""}
      {successMsg && <p className={classes.success}>{successMsg}</p>}
      <div className={classes.formDiv}>
        <form onSubmit={submitHandler}>
          <div className={classes.input}>
            <label htmlFor="email">Email</label>
            <input
              value={emailInput}
              id="email"
              type="email"
              onChange={emailInputHandler}
            />

            <label htmlFor="username">User Name</label>
            <input
              value={usernameInput}
              id="username"
              type="text"
              onChange={usernameInputHandler}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={passwordInput}
              type="text"
              onChange={passwordInputHandler}
            />

            <label htmlFor="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              value={confirmPasswordInput}
              type="text"
              onChange={confrimPasswordInputHandler}
            />

            <button className={classes.button} type="submit">
              Signup
            </button>
            <Link to="/login" className={classes.loginLink}>
              Already a user? Login here
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default NewUserForm;
