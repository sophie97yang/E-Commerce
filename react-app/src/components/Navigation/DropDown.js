import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import {NavLink,useHistory} from 'react-router-dom';

function DropDown({user}) {
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fa-solid fa-angle-down"/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ?
          <>
            <li><NavLink to='/account'>Your Account</NavLink></li>
            <li>Account Balance:${user.account_balance}</li>
            <li><NavLink to='/orders'>View/Manage Your Orders</NavLink></li>
            <li><NavLink to='/reviews'>View Your Reviews</NavLink></li>
            <li><NavLink to='/wishlist'>View Your Wishlist</NavLink></li>
            <li><NavLink to='/products'>View Your Products</NavLink></li>
            <li>
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          </>
          :
          <>
            <li>
              <button onClick={(e)=> {
                e.preventDefault()

              }}>Sign In</button>
            </li>
            <li><NavLink to='/login'>Your Account</NavLink></li>
            <li>Account Balance:${user.account_balance}</li>
            <li><NavLink to='/login'>View/Manage Your Orders</NavLink></li>
            <li><NavLink to='/login'>View Your Reviews</NavLink></li>
            <li><NavLink to='/login'>View Your Wishlist</NavLink></li>
            <li><NavLink to='/login'>View Your Products</NavLink></li>

          </>
}
      </ul>
    </>
  );
}

export default DropDown;
