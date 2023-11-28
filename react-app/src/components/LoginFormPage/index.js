// frontend/src/components/LoginFormModal/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch,useSelector } from "react-redux";
import { useHistory,Link } from 'react-router-dom';

import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormErrors] = useState({ empty: 'true' });
  // const [errors, setErrors] = useState({});
    const [errors, setErrors] = useState([]);

  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const member = useSelector(state=>state.session.member);



  useEffect(() => {
    if (Object.keys(formError).length) setDisabled(true);
    else setDisabled(false);
  }, [formError])

  useEffect(() => {
    const errorsForm = {};
    if (email.length < 4) errorsForm.email = true;
    if (password.length < 6) errorsForm.password = true;
    setFormErrors(errorsForm);
  }, [email, password])

  if (member) {
    history.push('/');
    return null;
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors({});
  //   return dispatch(sessionActions.login({ email, password }))
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       console.log("DATA ", data)
  //       if (data && data.errors) {
  //         setErrors(data.errors);
  //         return data.errors
  //       }
  //     })
  //     .then((res) => {
  //       if (!res.length) {
  //         console.log("RES", res)

  //         history.push('/products');
  //       } else {
  //         console.log("ELSE RES", res)
  //         console.log(errors)
  //       }

  //     });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(sessionActions.login({ email, password }));
  //   if (data) setErrors(data)
  // }

  //new feature of identifying the person
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(sessionActions.login({ email, password }));
    if (data) setErrors(data)
  }

  const handleDemoMember = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      email: "givemecheese@gmail.com",
      password: "geniusmouse123"
    })).catch(async (res) => {
      console.log(res)
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }).then(() => history.push('/products'));
  }

  const handleDemoSeller = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({
      email: "ih8Jerry@gmail.com",
      password: "killhim"
    })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }).then(() => history.push('/products'));
  }

  return (
    <div className="form-field">

      <h1>Log In</h1>
      <p>New to Parmazon? <Link to='/signup'>Sign Up here.</Link></p>

      <form onSubmit={handleSubmit} >

        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>

        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-slot"
        />

        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-slot"
        />

        <div className="form-slot">

          <button type="submit" className="login-button" disabled={disabled}>Log In</button>
          <button className="demo-user" onClick={handleDemoMember}>Log in as Demo Member</button>
          <button className="demo-user" onClick={handleDemoSeller}>Log in as Demo Seller</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
