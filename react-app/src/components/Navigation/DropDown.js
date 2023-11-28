import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, useHistory } from 'react-router-dom';

function DropDown({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push('/')
  };





  return (
    <>
      <button onClick={openMenu} id='dropdown-icon'>
        {showMenu ? <i className="fa-solid fa-angle-up fa-xl" /> : <i className="fa-solid fa-angle-down fa-xl" />}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ?
          <>
            <li><NavLink to='/account'>Your Account</NavLink></li>
            <li><NavLink to='/orders/past'>View/Manage Your Orders</NavLink></li>
            <li><NavLink to='/orders'>View Your Wishlist</NavLink></li>
            <p className="dropdown-balance">Account Balance: ${user.account_balance.toFixed(2)}</p>
            <li className='login-signup-div'>
              <button className="signOutButt" onClick={handleLogout}>Sign Out</button>
            </li>
          </>
          :
          <div className='unauth-dropdown'>
            <li className='login-signup-div'>
              <button className="signInUp" onClick={(e) => {
                e.preventDefault();
                closeMenu();
                history.push('/login')

              }}>Sign In</button>
            </li>
            <li className='login-signup-div' id='italics'>
            Not a Member Yet?
            <button className="signInUp" onClick={(e) => {
                e.preventDefault();
                closeMenu();
                history.push('/signup')

              }}>Sign Up</button>
              </li>
          </div>
        }
      </ul>
    </>
  );
}

export default DropDown;
