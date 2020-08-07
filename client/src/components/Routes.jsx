import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import employees from './employees/Index';
import NewEmployee from './employees/New'; import EditEmployee from './employees/Edit';

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/employees" render={
        renderProps => <employees
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/employess/new" component={NewEmployee}/>
      <Route exact path="/blogs/edit" component={EditEmployee}/>
    </Switch>
  );
}

export default Routes;