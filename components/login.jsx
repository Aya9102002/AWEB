import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { FlagContext } from '../context/flagContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      success
      message
      token
      user {
        user_id
        username
        role
      }
    }
  }
`;

const LogIn = () => {
  const { setFlag, setUser } = useContext(FlagContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    password: '',
  });

  const [staySignedIn, setStaySignedIn] = useState(false); 
  const [formErrors, setFormErrors] = useState({});

  const [logIn, { loading }] = useMutation(LOGIN_MUTATION);
const validateForm = () => {
  const errors = {};

  if (!userData.name) {
    errors.name = 'Username is required';
  } else if (!/^[A-Za-z0-9_]{3,10}$/.test(userData.name)) {
    errors.name =
      'Username must be 3-10 characters long and contain letters, numbers, or underscore';
  }

  if (!userData.password) {
    errors.password = 'Password is required';
  } else if (userData.password.length < 5) {
    errors.password = 'Password must be at least 5 characters long.';
  }

  setFormErrors(errors);
  return errors;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) return;

    try {
      const { data } = await logIn({
        variables: {
          username: userData.name,
          password: userData.password,
        },
      });

      if (data.logIn.success) {
        const { token, user } = data.logIn;

        if (staySignedIn) {
          localStorage.setItem('Token', token);
          localStorage.setItem('UserID', user.user_id);
          localStorage.setItem('Username', user.username);
          localStorage.setItem('UserRole', user.role);
        } else {
          sessionStorage.setItem('Token', token);
          sessionStorage.setItem('UserID', user.user_id);
          sessionStorage.setItem('Username', user.username);
          sessionStorage.setItem('UserRole', user.role);
        }

        setUser(user);
        setFlag(true);
        toast.success('Logged in successfully');
        navigate('/'); 
      } else {
        toast.error(data.logIn.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStaySignedInChange = (e) => {
    setStaySignedIn(e.target.checked);
  };

  return (
    <div className="sign-up">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input">
          <label>Username</label>
          <input
            name="name"
            className="textfiled"
            placeholder="Enter your username"
            onChange={handleInputChange}
            value={userData.name}
          />
          {formErrors.name && (
            <span className="error" style={{ color: 'red' }}>
              {formErrors.name}
            </span>
          )}
        </div>

        <div className="input">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="textfiled"
            placeholder="Enter your password"
            onChange={handleInputChange}
            value={userData.password}
          />
          {formErrors.password && (
            <span className="error" style={{ color: 'red' }}>
              {formErrors.password}
            </span>
          )}
        </div>

        <div className="checkbox" style={{ marginBottom: '15px' }}>
          <input
            type="checkbox"
            id="staySignedInCheckbox"
            checked={staySignedIn}
            onChange={handleStaySignedInChange}
          />
          <label htmlFor="staySignedInCheckbox">Stay signed in</label>
        </div>

        <button disabled={loading}>
          <label>Sign In</label>
        </button>

        <div className="aa" style={{ marginTop: '15px' }}>
          <h3>Don't have an account?</h3>
          <Link className="Link" to="/signup">
            Sign-Up
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LogIn;
