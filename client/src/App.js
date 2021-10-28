import { useState, useEffect } from 'react';

// ==============================================

// import logo from './logo.svg';
import './App.css';

// ==============================================

// ==============================================

const App = () => {
  // --------------------------------------------

  const [users, setUsers] = useState([]);

  // --------------------------------------------

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setUsers(data);
      })
      .catch((err) => {
        console.log('JOSH .catch()');
        console.log('error: ', err);
      });
  }, []);

  // --------------------------------------------

  // --------------------------------------------

  return (
    <div className='App'>
      Success! :)
      <ul>
        {users &&
          users.map((user) => {
            return <li>Username: {user.username}</li>;
          })}
      </ul>
    </div>
  );

  // --------------------------------------------
};

// ==============================================

export default App;
