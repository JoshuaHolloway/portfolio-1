import { useState, useEffect, useCallback } from 'react';

import decodeJWT from 'jwt-decode';

export const useAuth = () => {
  // --------------------------------------------

  // -token is local state to App.
  // -But it is tied to context's token.
  // -Hence, when this token state updates
  //  it sets its value to the context token.
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  // -Create function only once
  // -These f()'s are stored in context.
  // -NOTE: I think the use of the expirationDate
  //        parameter is not needed (redundant).
  //       -It is used to determine if we should
  //        create a new timestamp or not
  //        (i.e. whether this login() was called
  //         from a new login or from a page refresh).
  //       -Since I just check if token is already in
  //        local storage to determine if we are
  //        in one of these two cases, I don't
  //        need expirationDate.
  const login = useCallback((token, expirationDate) => {
    const decoded = decodeJWT(token);
    console.log('decoded: ', decoded);
    // -NOTE: Can extract expiration date from
    //        decoded token!!!
    //

    // -This function runs upon logging in
    //  AND upon page refresh.
    if (!localStorage.getItem('userData')) {
      // -Set expiration date
      const currentDate = new Date().getTime(); // # of ms since beginning of time
      const tokenExpirationDate =
        expirationDate ||
        new Date( // now + 1d
          // currentDate + 1e3 /*1s*/ * 60 /*1min*/ * 60 /*1hr*/ * 24 /* 1d */
          currentDate + 10e3 /*10s*/
        );

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
    }

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
  }, []);

  // --------------------------------------------

  // -NOTE: useEffect runs AFTER the render-cycle!
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date() // expiration in future => still valid
    ) {
      console.clear();
      console.log('current time:    ', new Date());
      console.log('expiration time: ', new Date(storedData.expiration));

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
