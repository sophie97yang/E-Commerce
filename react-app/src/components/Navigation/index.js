import React, {useState,useEffect} from 'react';
import { NavLink,useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import DropDown from './DropDown';
import SearchBar from './SearchBar';
import './Navigation.css';
import logo from './parmazon-logo.png';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.member)
	const history = useHistory();
	const [cart,setCart] = useState(0);
	const [pun,setPun] = useState('')
	const pun_rotation = [
		'This might sound so cheesy, but I think you are really grate.',
		"I'm grateful for your presence.",
		"it's gonna brie a gouda day",
		"You brie-long with me",
		"Cheezus take the Wheel!",
		"It's really gouda to have you here",
		"Gouda luck on your browsin!",
		"I swiss you the best",
		"I hope you have a hole lot of fun",
		"I Swiss you the best in your future endeavors",
		"Don't cheddar tear—everything's going to be okay",
		"It's always cheddar to give than to receive",
		"Nothing can get cheddar than this",
		"Wow, you're shredded"
	]
	useEffect(()=> {
		const randIdx= Math.floor(Math.random()*13);
		setPun(pun_rotation[randIdx]);
	},[])

	const shopping_cart = sessionUser && sessionUser.orders ? sessionUser.orders.filter(order=> order.purchased===false)[0] : null
	const cart_products = shopping_cart ? shopping_cart.products.length : 0

	useEffect(()=> {
		const shopping_cart = sessionUser ? sessionUser.orders.filter(order=> order.purchased===false)[0] : null
		const cart_products = shopping_cart ? shopping_cart.products.length : 0
		setCart(cart_products)
	},[cart_products,sessionUser])

	return (
		<div>
		<nav>
			<div className='logo'>
				<NavLink exact to="/"><img src={logo} alt='logo'/></NavLink>
			</div>
			<div>
				<p>Deliver to {sessionUser ? sessionUser.first_name : 'Location' }</p>
				<p>{sessionUser ? `${sessionUser.city}, ${sessionUser.state}` : <button onClick={(e)=> {
					e.preventDefault();
					history.push('/signup')
				}}>Sign up to Set Location</button>}</p>
			</div>
			<div className="search_bar_nav">
				<SearchBar />
			</div>
			<div>
				<p>Hello, {sessionUser ? sessionUser.first_name: 'Sign In' }</p>
				<p>Accounts and Lists</p>
				<DropDown user={sessionUser}/>
			</div>
			<div>
				<NavLink to='/orders/past'>
				Returns & Orders
				</NavLink>
			</div>

			<div className='cart_info'>
			<NavLink to='/orders'>
				{sessionUser? <h2>{cart}</h2>: <h2>0</h2>}
				<i className="fa-solid fa-cart-shopping fa-2xl"/>
			</NavLink>
			</div>

		</nav>
		<div className='fun-puns'>
			<p>{pun}</p>
		</div>
		</div>
	);
}

export default Navigation;
