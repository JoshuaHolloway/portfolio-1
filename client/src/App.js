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

import { useAuth } from './shared/hooks/auth-hook';

// ==============================================

// import logo from './logo.svg';
import './App.css';

// ==============================================

const App = () => {
  const [users, setUsers] = useState([]);
  // --------------------------------------------

  const { token, login, logout, user } = useAuth();

  // --------------------------------------------

  async function getData(endpoint = '') {
    // Default options are marked with *
    const url = `${process.env.REACT_APP_BACKEND}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
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
          <h1>
            <a href='https://joshua-holloway.com/'>joshua-holloway.com</a>
          </h1>
          <main>{routes}</main>
        </div>
      </Router>
    </AuthContext.Provider>
  );

  // --------------------------------------------
};

// ==============================================

export default App;
