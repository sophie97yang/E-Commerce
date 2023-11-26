import { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import './Orders.css'
// import CartForm from './CartFormPage'
import RemoveFromCart from './RemoveFromCart'
import { addToWishlist,deleteCart,deleteFromCart,authenticate } from '../../store/session'

function ShoppingCart() {
    const sessionUser = useSelector(state => state.session.member)
    const [cart,setCart] = useState([])
    const dispatch = useDispatch();

    useEffect(()=> {
		const shopping_cart = sessionUser ? sessionUser.orders.filter(order=> order.purchased===false)[0] : null
		setCart(shopping_cart ? shopping_cart.products: null)
	},[sessionUser])

    const AddToWishlist= async (product) => {
        const shopping_cart= sessionUser?.orders.filter(order=> order.purchased===false)[0]
        //IF SHOPPING CART HAS MORE THAN ONE PRODUCT(DO NOT NEED TO DELETE FULL ORDER)
        if (shopping_cart.products.length>1) {
        const res = await dispatch(addToWishlist(product.product.id)).then(dispatch(deleteFromCart(product.product.id))).catch(res=>res)
        console.log('res',res)
        if (!res.errors) {
            dispatch(authenticate())
            alert('Item added to wishlist');
        }else {
            console.log(res.errors);
        }
        } else {
            const res = await dispatch(addToWishlist(product.product.id)).then(dispatch(deleteCart(shopping_cart,product.product.id))).catch(res=>res)
            if (!res.errors) {
                dispatch(authenticate())
                alert('Item added to wishlist');
            }else {
                console.log(res.errors);
            }
        }
    }

    const handleTransaction = (e) => {
        e.preventDefault();
        alert('Feature coming soon!')
    }


    return (
        <div className='shopping_cart'>
            <h2>Shopping Cart</h2>
            {
                cart ? cart.map(product => (
                    <div key={product.id}>
                        <img src={product.product.preview_image} alt={product.product.name}/>
                        <h4>{product.product.name}</h4>
                        <p>{product.product.available>0 ? "In Stock": "Out of Stock"}</p>
                        <RemoveFromCart product={product}/>
                        <button onClick={()=>{AddToWishlist(product)}}>Add to Wishlist</button>
                        {/* <CartForm product={product}/> */}
                        {/* Current feature doesn't allow members to directly edit order on shopping cart */}
                        <p>Quantity:{product.quantity}</p>
                    </div>
                ))
                 : <h3>You're looking a little hungry...</h3>
            }
            <div>
            {
                cart ? <button onClick={handleTransaction}>Complete Transaction</button> : <p><Link to='/products'>Browse our lovely selection of cheeses</Link></p>
            }
            </div>
        </div>

    )
}

export default ShoppingCart
