import React, { useContext } from 'react';

import { AuthContext } from '../../../shared/context/auth-context';

import x from './NavLinks.module.css';

// ==============================================

const NavLinks = (props) => {
  // --------------------------------------------

  // -auth contains an object that contains
  //  the latest context.
  // -NavLinks will re-render any time
  //  the context we are listenig to changes.
  const auth = useContext(AuthContext);

  // --------------------------------------------

  return (
    <>
      <div>{auth.isLoggedIn ? 'Logged In' : 'Not Logged In'}</div>
      <div>
        {auth.isLoggedIn &&
          `username: ${auth.user.username} userId: ${auth.user.userId} role: ${auth.user.role}`}
      </div>

      {auth.isLoggedIn && (
        <button
          onClick={() => {
            auth.logout();
          }}
        >
          Logout
        </button>
      )}
      <ul className={x['nav-links']}>
        <li>(public) Users</li>
        {auth.isLoggedIn && <li>(restricted) Account Dashboard</li>}
        {!auth.isLoggedIn && <li>(public)Authenticate</li>}
      </ul>
    </>
  );

  // --------------------------------------------
};

// ==============================================

export default NavLinks;
