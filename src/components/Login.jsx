import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
const API_URL = process.env.REACT_APP_API_URL;

import './Login.css';

function Login() {
  const dispatch = useStateValue()[1];
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();

    // login with backend.
    if (email && password) {
      fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error('Email or Password wrong');
          } else {
            return res.json();
          }
        })
        .then((user) => {
          if (user) {
            localStorage.setItem('AMAZON_TOKEN', user.token);
            dispatch({ type: 'SET_USER', user });
            history.push('/');
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const register = (e) => {
    e.preventDefault();

    // register with backend.
    if (email && password) {
      fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.status !== 201) {
            throw new Error('Email already used in other account');
          } else {
            return res.json();
          }
        })
        .then((user) => {
          // console.log(user);
          if (user) {
            history.push('/');
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className="login flex_col_align_center">
      <Link to="/">
        <img
          className="login__logo"
          src="https://i1.wp.com/www.joptimisemonsite.fr/wp-content/uploads/2015/02/logo-amazon.jpg?fit=300%2C109&ssl=1&is-pending-load=1"
          alt="Amazon logo"
        />
      </Link>
      <div className="login__container flex_col_justify_between">
        <h1>Sign-in</h1>
        <form className="flex_col_justify_between">
          <label htmlFor="email">E-mail</label>
          <input type="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="email">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="login__signInButton" onClick={signIn}>
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to AMAZON FAKE CLONE Conditions of Use & Sale. Please Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <button type="button" className="login__registerButton" onClick={register}>
          {' '}
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
