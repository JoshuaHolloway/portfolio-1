import { useState, useEffect, useCallback } from 'react';
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  // -Create function only once
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
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

  // --------------------------------------------

  return (
    // -When the value of any of thse change the ne value
    //  is passed down to the components that are interested.
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <div className='App'>
          <div>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</div>

          <NavLinks />

          <Switch>
            <Route path='/'>
              <AuthPage />
            </Route>

            <Route path='/'>
              <button onClick={getUsersHandler}>Get Users</button>
            </Route>

            <Redirect to='/auth' />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );

  // --------------------------------------------
};

// ==============================================

export default App;
