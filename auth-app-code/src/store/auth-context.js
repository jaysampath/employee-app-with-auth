import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
 
});

export const AuthContextProvider = (props) => {
  const [cookie, setCookie] = useCookies(["loginCookie"]);
  //console.log("loginCookie in auth:", cookie);

  const storedCookie = Cookies.get("loginCookie");

  //console.log("stored ccokie", storedCookie);

  if (storedCookie === "") {
    //console.log("no cookie");
  } else {
   // console.log("cookie present: " + storedCookie);
  }

  const [token, setToken] = useState(storedCookie);

  const userIsAuth = !!token;
  //console.log("userIsAuth: " + userIsAuth);
  const loginHandler = (token) => {
    //console.log(token);
    setToken(token);
    //console.log("userIsAuth: " + userIsAuth);
    setCookie("loginCookie", token, { path: "/" });
   // console.log("loginCookie in auth login: ", cookie);
  };


  const contextValue = {
    token: cookie,
    isLoggedIn: userIsAuth,
    login: loginHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
