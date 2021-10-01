import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import Cookies from "js-cookie";

const AppContext = React.createContext({
  token: "",
  isLoggedIn: false,
  logout: () => {},
});

export const AppContextProvider = (props) => {
  
  const [cookie, setCookie] = useCookies(["loginCookie"]);
  // console.log("stored value: "+storedValue);

  const storedCookie = Cookies.get("loginCookie");
 
  console.log("loginCookie in app: ",storedCookie);
  

  const [token, setToken] = useState(storedCookie);
 
  const userIsAuth = !!token;

  const logoutHandler = () => {
    setToken(null);
    console.log("logout");
    setCookie("loginCookie","",{path:"/"});
   // removeCookie("loginCookie");
  };

  const contextValue = {
    token: cookie,
    isLoggedIn: userIsAuth,
    logout: logoutHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
