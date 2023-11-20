// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled,setDisabled]=useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoMember = (e) => {
      e.preventDefault()
      setCredential("givemecheese@gmail.com")
      setPassword("geniusmouse123")
      return dispatch(sessionActions.login({
        credential: "givemecheese@gmail.com",
        password: "geniusmouse123"
      }))
  }

  const handleDemoSeller = (e) => {
    e.preventDefault()
    setCredential("ih8Jerry@gmail.com")
    setPassword("killhim")
    return dispatch(sessionActions.login({
      credential: "ih8Jerry@gmail.com",
      password: "killhim"
    }))
}

  return (
    <div className="form-field">

      <h1>Log In</h1>

      <form onSubmit={handleSubmit} >

          Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
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

        {errors.credential && (
          <p style={{ fontSize: "10px", color: "red" }}>{errors.credential}</p>
        )}
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
