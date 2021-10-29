import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';

// ==============================================

const AuthPage = () => {
  const auth = useContext(AuthContext);
  // --------------------------------------------

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('username: ', username);
  }, [username]);
  useEffect(() => {
    console.log('password: ', password);
  }, [password]);

  // --------------------------------------------

  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
  async function postData(endpoint = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}${endpoint}`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    return response.json(); // parses JSON response into native JavaScript objects
  }

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

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    const data = await postData('/auth/register', { username, password });
    console.log('data: ', data);
  };

  // --------------------------------------------

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const data = await postData('/auth/login', { username, password });
    console.log('data: ', data);

    auth.login();
  };
  // --------------------------------------------

  return (
    <form>
      <h5>Register</h5>

      <label htmlFor='username'>
        <input
          id='username'
          type='text'
          placeholder='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>

      <label htmlFor='password'>
        <input
          id='password'
          type='text'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button onClick={onRegisterHandler}>Register</button>
      <button onClick={onLoginHandler}>Login</button>
    </form>
  );
};

// ==============================================

export default AuthPage;
