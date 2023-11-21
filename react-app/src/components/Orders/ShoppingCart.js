import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useEffect,useState } from 'react'
import './Orders.css'
import CartForm from './CartFormPage'

function ShoppingCart({isLoaded}) {
    const sessionUser = useSelector(state => state.session.member)
    const [cart,setCart] = useState([])
    useEffect(()=> {
		const shopping_cart = sessionUser ? sessionUser.orders.filter(order=> order.purchased===false)[0] : null
		setCart(shopping_cart ? shopping_cart.products: null)

	},[sessionUser])

    if (isLoaded && !sessionUser) {
        return <Redirect to='/login'/>
    }
    console.log(cart)
    return (
        <div className='shopping_cart'>
            <h2>Shopping Cart</h2>
            {
                cart.length ? cart.map(product => (
                    <div key={product.id}>
                        <img src={product.product.preview_image} alt={product.product.name}/>
                        <h4>{product.product.name}</h4>
                        <p>{product.product.available>0 ? "In Stock": "Out of Stock"}</p>
                        <button>Delete</button>
                        <button>Add to Wishlist</button>
                        <CartForm product={product.product}/>
                        <button>Complete Transaction</button>
                    </div>
                )) : <h2>Your Shopping Cart is Empty!</h2>
            }
        </div>

    )
}

export default ShoppingCart
