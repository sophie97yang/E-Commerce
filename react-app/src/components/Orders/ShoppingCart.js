import { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link,useHistory } from 'react-router-dom'
import './Orders.css'
// import CartForm from './CartFormPage'
import RemoveFromCart from './RemoveFromCart'
import { addToWishlist,deleteCart,deleteFromCart,authenticate, completeTransaction } from '../../store/session'
import { getAllProducts } from '../../store/products'

function ShoppingCart() {
    const sessionUser = useSelector(state => state.session.member)
    const [cart,setCart] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('cart',cart);

    useEffect(()=> {
		const shopping_cart = sessionUser ? sessionUser.orders.filter(order=> order.purchased===false)[0] : null
		setCart(shopping_cart ? shopping_cart.products: null)
	},[sessionUser])

    useEffect(()=> {
        dispatch(getAllProducts())
    },[dispatch])

    //calculate total price of cart
    let total=0;
    cart?.forEach(product=> total+=(product.product.price*product.quantity))


    const AddToWishlist= async (product) => {
        const shopping_cart= sessionUser?.orders.filter(order=> order.purchased===false)[0]
        //IF SHOPPING CART HAS MORE THAN ONE PRODUCT(DO NOT NEED TO DELETE FULL ORDER)
        if (shopping_cart.products.length>1) {
        const res = await dispatch(addToWishlist(product.product.id)).then(dispatch(deleteFromCart(product.product.id))).catch(res=>res)

        if (!res.errors) {
            dispatch(authenticate())
        }else {
            console.log(res.errors);
        }
        } else {
            const res = await dispatch(addToWishlist(product.product.id)).then(dispatch(deleteCart(shopping_cart,product.product.id))).catch(res=>res)
            if (!res.errors) {
                dispatch(authenticate())
            }else {
                console.log(res.errors);
            }
        }
    }

    const handleTransaction = async (e) => {
        e.preventDefault();
        //when transaction is complete,member order changes and product info (quantity) changes
        const res = await dispatch(completeTransaction()).catch(res=>res);
        if (!res.errors) {
            dispatch(authenticate());
            history.push(`/orders/${cart[0].order_id}/complete`);
        }
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
                cart ? <div className='transaction-details'>
                    <div> <h4>Your Current Balance:</h4><p> {sessionUser.account_balance.toFixed(2)}</p></div>
                    <div className='transaction-total'><h4>{`Total (${cart.length}`} {cart.length===1 ? 'item)':"items)"}:</h4><p>{total.toFixed(2)}</p></div>
                    <div><h4>Your Balance After Checkout</h4><p>{(sessionUser.account_balance-total).toFixed(2)}</p></div>
                    <button onClick={handleTransaction}>Complete Transaction</button>
                    </div>: <p><Link to='/products'>Browse our lovely selection of cheeses</Link></p>
            }
            </div>
        </div>

    )
}

export default ShoppingCart
