import React, { useState } from 'react';

export const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [info, setInfo] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo && userInfo.token && info === null) {
    setInfo(userInfo);
  }

  const logIn = (user) => setInfo(user);
  const logOut = () => {
    localStorage.removeItem('userInfo');
    setInfo(null);
  };

  return (
    <UserContext.Provider value={{ info, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
