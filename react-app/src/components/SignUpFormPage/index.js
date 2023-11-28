import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useHistory } from "react-router-dom";
import { signUp, authenticate } from "../../store/session";
import "./SignupForm.css";
import { Link } from "react-router-dom";


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionMember = useSelector((state) => state.session.member)
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seller, setSeller] = useState(false); //checkbox

  const [errors, setErrors] = useState({});

  const disabled =
    !firstName ||
    !lastName ||
    !address ||
    !city ||
    !state ||
    !email ||
    !password ||
    !confirmPassword;

  if (sessionMember) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorList = {};

    if (!firstName) errorList.firstName = "First Name is required";
    if (!lastName) errorList.lastName = "Last Name is required";
    if (!address) errorList.address = "Address is required";
    if (!city) errorList.city = "City is required";
    if (!state) errorList.state = "Please select a state";
    if (!email || !email.includes("@"))
      errorList.email = "Valid email is required";
    if (!password || password.length<6) errorList.password = "Valid Password is required";
    if (password !== confirmPassword)
      errorList.confirmPassword = "Passwords must match";

    if (Object.values(errorList).length > 0) {
      setErrors(errorList);
      return;
    }

    if (password === confirmPassword) {
      setErrors({});
      const response = await dispatch(
        signUp({
          firstName,
          lastName,
          address,
          city,
          state,
          email,
          password,
          seller,
        })
      ).catch((res) => res);
      if (response && response[0].startsWith("email")) {
        const errorList_email = { "email": response[0].slice(8) };
        setErrors(errorList_email);
      } else {
        dispatch(authenticate());
        history.push('/products')
      }
    } else {
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  }
  };

  return (
    <div className="main-container">
      <>
      <div className="topPart"></div>
        <h1 className="signUpPart">Sign Up</h1>
        <div>
          <p className="alreadyMember"> Already a member? <Link to='/login'>Log in here.</Link></p>
        </div>
        <div></div>
        <form onSubmit={handleSubmit}>
          {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}

          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p style={{ fontSize: "10px", color: "red" }}>
                *{errors.firstName}
              </p>
            )}
          </label>

          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p style={{ fontSize: "10px", color: "red" }}>
                *{errors.lastName}
              </p>
            )}
          </label>

          <label>
            Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <p style={{ fontSize: "10px", color: "red" }}>
                *{errors.address}
              </p>
            )}
          </label>

          <label>
            City
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.city}</p>
            )}
          </label>

          <label>
            State
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">Select a State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            {errors.state && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.state}</p>
            )}
          </label>

          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email && (
              <p style={{ fontSize: "10px", color: "red" }}>*{errors.email}</p>
            )}
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors.password && (
              <p style={{ fontSize: "10px", color: "red" }}>
                *{errors.password}
              </p>
            )}
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {errors.confirmPassword && (
              <p style={{ fontSize: "10px", color: "red" }}>
                *{errors.confirmPassword}
              </p>
            )}
          </label>

          <label>
            Seller
            <input
              type="checkbox"
              checked={seller}
              onChange={(e) => setSeller(e.target.checked)}
            />
          </label>

          <button type="submit">Sign Up</button>
        </form>
      </>
    </div>
  );
}

export default SignupFormPage;
