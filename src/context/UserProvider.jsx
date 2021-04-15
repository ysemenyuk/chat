import React, { useState } from 'react';
import UserContext from './UserContext.js';

const UserProvider = ({ children, userInfo }) => {
  // console.log('UserProvider userInfo -', userInfo);

  const [info, setInfo] = useState(userInfo);

  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // if (userInfo && userInfo.token && info === null) {
  //   setInfo(userInfo);
  // }

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
