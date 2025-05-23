import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Projects from './components/projects';
import Tasks from './components/task';
import Chat from './components/chat';
import Home from './components/home';
import SignUp from './components/signup';
import LogIn from './components/login';
import { ToastContainer } from 'react-toastify';
import './css/main_page.css';
import { FlagContext } from './context/flagContext';

function App() {
  const { flag, setFlag } = useContext(FlagContext);

  useEffect(() => {
    const token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
    if (token) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [setFlag]);

  if (!flag) {
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<LogIn />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          closeOnClick
          theme="colored"
        />
      </Router>
    );
  }

  return (
    <Router>
      <div className="main-layout">
        <Header />
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/signin" element={<Navigate to="/" />} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        theme="colored"
      />
    </Router>
  );
}

export default App;
