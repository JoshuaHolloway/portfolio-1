import React, { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import NavLinks from './elements/components/NavLinks/NavLinks';

import AuthPage from './elements/pages/AuthPage';

import { AuthContext } from './shared/context/auth-context';

// ==============================================

// import logo from './logo.svg';
import './App.css';

// ==============================================

const App = () => {
  // --------------------------------------------

  // -token is local state to App.
  // -But it is tied to context's token.
  // -Hence, when this token state updates
  //  it sets its value to the context token.
  const [token, setToken] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  // -Create function only once
  // -These f()'s are stored in context.
  const login = useCallback((token) => {
    // -TODO: Place token in local storage.

    // setIsLoggedIn(true);
    setToken(token);
  }, []);

  const logout = useCallback((token) => {
    // -TODO: Remove token from local storage.

    // setIsLoggedIn(false);
    setToken(null);
  }, []);

  useEffect(() => {
    console.log('users: ', users);
  }, [users]);

  // --------------------------------------------

  async function getData(endpoint = '') {
    // Default options are marked with *
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}${endpoint}`
      );
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // --------------------------------------------

  const getUsersHandler = async () => {
    const users = await getData('/users');
    console.log('users: ', users);
    setUsers(users);
  };

  // -Frontend protected routes
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path='/'>
          Private Route!
          <button onClick={getUsersHandler}>Get Users</button>
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/'>
          <AuthPage />
        </Route>

        {/* <Redirect to='/public' /> */}
      </Switch>
    );
  }

  // --------------------------------------------

  return (
    // -When the value of any of thse change the ne value
    //  is passed down to the components that are interested.
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout }}>
      <Router>
        <div className='App'>
          <NavLinks />

          <main>{routes}</main>
        </div>
      </Router>
    </AuthContext.Provider>
  );

  // --------------------------------------------
};

// ==============================================

export default App;
