import React, { useState, useEffect, useCallback } from 'react';
import decodeJWT from 'jwt-decode';
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
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  // -Create function only once
  // -These f()'s are stored in context.
  const login = useCallback((token) => {
    localStorage.setItem('token', token);
    // localStorage.setItem('userData', JSON.stringify({ userId: 1, token }));

    const decoded = decodeJWT(token);
    console.log('decoded: ', decoded);

    // setIsLoggedIn(true);
    setToken(token);
    setUser({
      username: decoded.username,
      userId: decoded.userId,
      role: decoded.role,
    });
  }, []);

  const logout = useCallback((token) => {
    // -TODO: Remove token from local storage.
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    // setIsLoggedIn(false);
    setToken(null);
  }, []);

  useEffect(() => {
    console.log('users: ', users);
  }, [users]);

  // --------------------------------------------

  // -NOTE: useEffect runs AFTER the render-cycle!
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      login(t);
    }
  }, [login]);
  // -Due to useCallbac, login creation will only run once.
  // -In other words, this useEffect callback
  //  will only run directly after initial page render.
  // -Since this runs AFTER page render,
  //  the user will see a flash of the non-logged-in
  //  user screen before this runs.

  // --------------------------------------------

  async function getData(endpoint = '') {
    // Default options are marked with *
    const url = `${process.env.REACT_APP_BACKEND}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
      });
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
  // -Shouldn't we check to make sure the token is valid here?
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
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, user }}
    >
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
