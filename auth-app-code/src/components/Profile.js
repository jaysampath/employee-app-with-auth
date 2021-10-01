import classes from "./Profile.module.css";
import { Redirect } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useContext, useEffect, useState } from "react";
const Profile = (props) => {
  const authCtx = useContext(AuthContext);

  const currUser = authCtx.token;

  const [currUsername, setCurrUsername] = useState(null);
  const [currPassword, setCurrPassword] = useState(null);

  useEffect(() => {
    if (currUser) {
      fetch(`http://localhost:8080/user/${currUser}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setCurrUsername(data["username"]);
          setCurrPassword(data["password"]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currUser]);

  if (!authCtx.isLoggedIn) {
    //  console.log(authCtx.isLoggedIn);
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.profileDiv}>
      <h1 className={classes.title}>Your Profile</h1>
      <div className={classes.details}>
        <div className={classes.element}>
          <span className={classes.label}> Email </span>
          <span className={classes.value}> {currUser} </span>
        </div>
        {currUsername && (
          <div className={classes.element}>
            <span className={classes.label}> Username </span>
            <span className={classes.value}> {currUsername} </span>
          </div>
        )}
        {currPassword && (
          <div className={classes.element}>
            <span className={classes.label}> password </span>
            <span className={classes.value}> {currPassword} </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
