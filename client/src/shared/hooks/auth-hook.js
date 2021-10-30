import { useState, useEffect, useCallback } from 'react';

import decodeJWT from 'jwt-decode';

// !!! NOTE! The bug is that if the user does not click logout.
// -We also need to automatically log the user out.
let logoutTimer; // set this whenever token changes.
let delta;

export const useAuth = () => {
  // --------------------------------------------

  // -token is local state to App.
  // -But it is tied to context's token.
  // -Hence, when this token state updates
  //  it sets its value to the context token.
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // -These f()'s are stored in context.
  const login = useCallback((token, expirationDate) => {
    const decoded = decodeJWT(token);
    console.log('decoded: ', decoded);
    delta = decoded.exp - decoded.iat;
    console.log('delta: ', delta);
    // -NOTE: Can extract expiration date from
    //        decoded token!!!

    // -This function runs upon logging in
    //  AND upon page refresh.

    // -Set expiration date
    const currentDate = new Date().getTime(); // # of ms since beginning of time

    // -Shadowed variable
    // -Does not overwrite out actual state
    // -state variable with same name!
    const tokenExpirationDate =
      expirationDate || // if expirationDate is NOT retreived from local-storage, then calculate it from the current time + delta
      new Date( // now + 1d
        // currentDate + 1e3 /*1s*/ * 60 /*1min*/ * 60 /*1hr*/ * 24 /* 1d */
        // currentDate + 1e3 /*1s*/ * 10 /* 10s. */
        currentDate + 1e3 /*1s*/ * delta /* delta-seconds */
        // ^Extracted from the actual expiration date
        //  encoded in token!!
      );

    // Update state:
    setTokenExpirationDate(tokenExpirationDate);
    // -In the next re-render cycle we will have the correct
    //  token expiration date.

    // -We will go in here upon new login.
    // localStorage.setItem('token', token);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: decoded.userId,
        username: decoded.username,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );

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
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
    }

    // setIsLoggedIn(false);
    setToken(null);
    setTokenExpirationDate(null);
  }, []);

  // --------------------------------------------

  useEffect(() => {
    // -When we login, we set a new timer.
    // -When we logout, we clear the timer.
    // -Both logging out and logging in
    //  change the state of token
    //  which triggers this useEffect callback.

    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // -the else block runs when the user
      //  manually presss the log-out button.
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);
  // -Token either changed because:
  //  - we logged in (through form or auto-login)
  //  - we logged out

  // --------------------------------------------

  // -NOTE: useEffect runs AFTER the render-cycle!
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData) {
      console.log('current time:    ', new Date());
      console.log('expiration time: ', new Date(storedData.expiration));
    }

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date() // expiration in future => still valid
    ) {
      // -Don't create a new expiration time
      // -We want to only create a new expiration time
      //  upon new login.
      login(storedData.token, new Date(storedData.expiration));
    }
  }, [login]);
  // -Due to useCallbac, login creation will only run once.
  // -In other words, this useEffect callback
  //  will only run directly after initial page render.
  // -Since this runs AFTER page render,
  //  the user will see a flash of the non-logged-in
  //  user screen before this runs.

  return { token, login, logout, user };
};
