
import { Route, Switch , Redirect } from "react-router-dom";
import AuthForm from "./components/AuthForm";

import NewUserForm from "./components/NewUserForm";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import {useContext} from 'react';
import AuthContext from "./store/auth-context";
function App() {
  const authCtx = useContext(AuthContext);
  
  if(authCtx.isLoggedIn){
     //console.log("cookie there, redirect to app");
     window.location.href="http://localhost:3000";
  }else{
    //console.log("no cookie, login page");
  }
  return (
    <Layout >
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact>
          <AuthForm />
        </Route>
        <Route path="/register" exact>
          <NewUserForm />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="*">
           <p>Page not found. invalid url</p>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
