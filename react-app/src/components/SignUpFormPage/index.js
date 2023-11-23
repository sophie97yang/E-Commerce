import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.member);
  // console.log('SEEOIONON USER', sessionUser)
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [seller, setSeller] = useState(false)  //checkbox
  const [isFormValid, setIsFormValid] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [errors, setErrors] = useState([]);
  const history=useHistory()

  // ref to regex
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!re.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password) => {
    if (!(password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password))) {
      setPasswordError("Password must be at least 8 characters long and include both letters and numbers.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };




  const updateFormValidity = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = password === confirmPassword;
    const areOtherFieldsValid = first_name.trim() && last_name.trim() && address.trim() && city.trim() && state;

    setIsFormValid(isEmailValid && isPasswordValid && isConfirmPasswordValid && areOtherFieldsValid);
  };

  useEffect(() => {
    updateFormValidity();
  }, [first_name, last_name, address, city, state, email, password, confirmPassword]);

if (sessionUser) {
   history.push('/');
   return null
  }



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let newErrors = [];

//     if (!validateEmail(email)) {
//       newErrors.push("Please enter a valid email address.");
//     }

//     if (!validatePassword(password)) {
//       newErrors.push("Password must be at least 8 characters long and include both letters and numbers.");
//     }

//     if (password !== confirmPassword) {
//       newErrors.push("Confirm Password field must be the same as the Password field");
//     }

//     if (newErrors.length === 0) {
//       const userData = {
//         first_name: firstName,
//         last_name: lastName,
//         address,
//         city,
//         state,
//         seller,
//         email,
//         password
//       };

//       const response = await dispatch(signUp(userData));

//     // Handle the response
//     if (response.ok) {
//       history.push('/products');
//     } else {
//       const data = await response.json();
//       newErrors = data.errors || ["An error occurred during sign up."];
//       setErrors(newErrors);
//     }
//   }};


const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked');
    let newErrors = [];

    if (!validateEmail(email)) {
      newErrors.push("Please enter a valid email address.");
    }

    if (!validatePassword(password)) {
      newErrors.push("Password must be at least 8 characters long and include both letters and numbers.");
    }

    if (password !== confirmPassword) {
      newErrors.push("Confirm Password field must be the same as the Password field");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return; // Stop execution if there are errors
    }

    try {
      const userData = {
        first_name,
        last_name,
        address,
        city,
        state,
        seller,
        email,
        password
      };

      console.log('Dispatching signUp');
      const actionResult = await dispatch(signUp(userData));
      const response = actionResult.payload;

      if (response?.ok) {
        console.log('SignUp Success');
        history.push('/products');
      } else {
        console.log('SignUp Failed', response);
        newErrors = response?.errors || ["An error occurred during sign up."];
        setErrors(newErrors);
      }
    } catch (error) {
      console.error('SignUp Error', error); // Error logging
      setErrors(["An unexpected error occurred. Please try again."]);
    }
  };






return (
    <div className="main-container">
        <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        <label>
          First Name
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {firstNameError && <div className="error-message">{firstNameError}</div>}
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <label>
  State
  <select value={state} onChange={(e) => setState(e.target.value)} required>
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
</label>



        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            required
          />
        </label>


        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              // Trigger validation for confirmPassword
              setIsFormValid(password === e.target.value);
              setConfirmPasswordError(password === e.target.value ? "" : "Confirm Password field must be the same as the Password field");
            }}
            required
          />
          {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
        </label>


<label>
  Seller
  <input
    type="checkbox"
    checked={seller}
    onChange={(e) => setSeller(e.target.checked)}
  />
</label>

<button type="submit" disabled={!isFormValid}>Sign Up</button>
      </form>
    </>
    </div>

  )
}


export default SignupFormPage;
