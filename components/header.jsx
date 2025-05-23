import React, { useContext } from 'react';
import { FlagContext } from '../context/flagContext';

const Header = () => {
  const { user, setUser, setFlag } = useContext(FlagContext);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setFlag(false);
  };


  return (
    <header className="header">
      <div className="user-name">
        {user.role === 'admin' ? `Admin ${user.username}` : `Student ${user.username}`}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
