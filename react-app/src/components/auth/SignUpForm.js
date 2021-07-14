import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import styles from './SignUpForm.module.css'


const SignUpForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([])
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data.errors){
        setErrors(data.errors)
      }
    }
    else {
     setErrors(['Your Passwords Must Match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.signUpFormContainer}>
      <div>
      {errors.map((error)=>(
        <div key={error}>{error}</div>
      ))}
      </div>
    <form className={styles.signUpForm} onSubmit={onSignUp}>
        <label>User Name:</label>
      <div>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
        <label>Email:</label>
      <div>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
        <label>Password:</label>
      <div>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
        <label>Repeat Password:</label>
      <div>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
