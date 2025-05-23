import React, { createContext, useState, useEffect } from 'react';

export const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    const userID = localStorage.getItem('UserID') || sessionStorage.getItem('UserID');
    const username = localStorage.getItem('Username') || sessionStorage.getItem('Username');
    const userRole = localStorage.getItem('UserRole') || sessionStorage.getItem('UserRole');

    if (token && userID && username && userRole) {
      setFlag(true);
      setUser({
        user_id: userID,
        username,
        role: userRole,
      });
    }
  }, []);

  return (
    <FlagContext.Provider value={{ flag, setFlag, user, setUser }}>
      {children}
    </FlagContext.Provider>
  );
};
