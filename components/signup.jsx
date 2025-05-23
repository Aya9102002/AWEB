import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/sign.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $password: String!, $role: String!, $studentId: Int) {
    register(username: $username, password: $password, role: $role, studentId: $studentId) {
      success
      message
    }
  }
`;

const SignUP = () => {
  const [userData, setUserData] = useState({
    name: '',
    password: '',
    uniID: '',
  });
  const [checkbox, setCheckbox] = useState(false);
  const [formerror, setFormErrors] = useState({});

  const [register, { loading }] = useMutation(REGISTER_MUTATION);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const validateForm = () => {
  const errors = {};

  if (!userData.name) {
    errors.name = 'Username is required';
  } else if (!/^[A-Za-z0-9_]{3,10}$/.test(userData.name)) {
    errors.name = 'Username must be 3-10 characters, letters, numbers, or underscore';
  }

  if (!userData.password) {
    errors.password = 'Password is required';
  } else if (userData.password.length < 5) {
    errors.password = 'Password must be at least 5 characters long.';
  }

  if (checkbox) {
    if (!userData.uniID) {
      errors.uniID = 'University ID is required';
    } else if (!/^\d{8}$/.test(userData.uniID)) {
      errors.uniID = 'University ID must be exactly 8 digits';
    }
  }

  setFormErrors(errors);
  return errors;
};

  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) return;

    try {
      const variables = {
        username: userData.name,
        password: userData.password,
        role: checkbox ? 'student' : 'admin',
        studentId: checkbox ? parseInt(userData.uniID, 10) : null,
      };

      const { data } = await register({ variables });

      if (data.register.success) {
        toast.success(data.register.message);

    } else {
        toast.error(data.register.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input">
          <label>Username</label>
          <input
            className="textfiled"
            name="name"
            onChange={handleInputChange}
            placeholder="Enter username"
            value={userData.name}
          />
          {formerror.name && <span className="error">{formerror.name}</span>}
        </div>

        <div className="input">
          <label>Password</label>
          <input
            type="password"
            className="textfiled"
            name="password"
            onChange={handleInputChange}
            placeholder="Enter password"
            value={userData.password}
          />
          {formerror.password && <span className="error">{formerror.password}</span>}
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
            id="studentCheckbox"
          />
          <label htmlFor="studentCheckbox">I'm a student</label>
        </div>

        {checkbox && (
          <div className="input">
            <label>University ID</label>
            <input
              className="textfiled"
              name="uniID"
              onChange={handleInputChange}
              placeholder="Enter your university ID"
              value={userData.uniID}
            />
            {formerror.uniID && <span className="error">{formerror.uniID}</span>}
          </div>
        )}

        <div>
          <button disabled={loading}>{loading ? 'Registering...' : 'Sign Up'}</button>
        </div>

        <div className="aa">
          <h3>Have an account?</h3>
          <Link className="Link" to="/signin">
            Sign-In
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUP;
