/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Login() {
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const getUser = (event) => {
    event.preventDefault();
    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log(user);
    axios
      .post('/users/login', user)
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.debug_data);
          setMsg('');
        } else {
          localStorage.setItem('token', res.data.token);
          setMsg('login successfull');
          setError('');
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="file-form">
      <h1>Login Here</h1>
      <p className="error">{error}</p>
      <form onSubmit={getUser}>
        <div className="form-label">
          <b>Enter Username:</b>
        </div>
        <input type="text" placeholder="Username" name="username" required />
        <br />
        <div className="form-label">
          <b>Enter Password:</b>
        </div>
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <br />
        <button type="submit" className="btn btn-success m-2">
          Register
        </button>
      </form>
      <p className="msg">{msg}</p>
    </div>
  );
}
