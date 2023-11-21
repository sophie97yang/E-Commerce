import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DropDown from './DropDown';
import SearchBar from './SearchBar';
import './Navigation.css';
import logo from './parmazon-logo.png'

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.member);
	if (!sessionUser) return null
	return (
		<div>
			<div>
				<NavLink exact to="/"><img src={logo} alt='logo'/></NavLink>
			</div>
			<div>
				<p>Deliver to {sessionUser ? sessionUser.first_name : 'Location' }</p>
				<p>{sessionUser ? `${sessionUser.city}, ${sessionUser.state}` : <button>Sign up to Set Location</button>}</p>
			</div>
			<div>
				<SearchBar />
			</div>
			<div>
				<p>Hello, {sessionUser ? sessionUser.first_name: 'sign in' }</p>
				<p>Accounts and Lists</p>
				<DropDown user={sessionUser}/>


			</div>

		</div>
	);
}

export default Navigation;
