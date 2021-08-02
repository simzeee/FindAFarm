import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

import styles from './LoginForm.module.css'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
  
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data.errors) {
      setErrors(data.errors);
    } else {

    }
  };

  const guestDemoLogin = () => {
    setEmail('demo@aa.io');
    setPassword('password');
    login(email,password)
  }

  const guestFarmerLogin = () => {
    setEmail('beets@gmail.com');
    setPassword('password');
    login(email,password)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.loginFormContainer}>
    <form className={styles.loginForm} onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
        <label htmlFor="email">Email:</label>
      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
        <label htmlFor="password">Password:</label>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button type="submit">Login</button>
      <div className={styles.buttonContainer}>
        <button type="submit" onClick={guestDemoLogin}>Demo Guest Login</button>
        <button type="submit" onClick={guestFarmerLogin}>Demo Farmer Login</button>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
