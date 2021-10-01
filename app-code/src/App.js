import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Employees from "./components/Employees";
import NewEmployee from "./components/NewEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import {useContext} from "react";
import AppContext from "./store/app-context";
function App() {
  const appCtx = useContext(AppContext);
  
  if(!appCtx.isLoggedIn){
    window.location.href="http://localhost:3006";
    //console.log("no cookie, redirect to login page");
  }else{
    //console.log("cookie present. current user: ",appCtx.token);
  }
  return (
    <Layout> 
      <Switch>
        <Route path="/" exact>
          <Redirect to="/employees" />
        </Route>

        <Route path="/employees" exact>
          <Employees />
        </Route>

        <Route path="/new-employee">
          <NewEmployee />
        </Route>

        <Route path="/update">
          <UpdateEmployee />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
