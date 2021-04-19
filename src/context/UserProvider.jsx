import React, { useState } from 'react';
import UserContext from './UserContext.js';

const UserProvider = ({ children, userInfo }) => {
  const [info, setInfo] = useState(userInfo);

  const isLogin = () => !!info;
  const logIn = (user) => setInfo(user);
  const logOut = () => {
    localStorage.removeItem('userInfo');
    setInfo(null);
  };

  return (
    <UserContext.Provider
      value={{
        info, logIn, logOut, isLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
