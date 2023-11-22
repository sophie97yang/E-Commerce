import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import './Orders.css'
import { authenticate, deleteCart, deleteFromCart } from '../../store/session';


function RemoveFromCart({product}) {
    const member = useSelector(state => state.session.member);
    const dispatch = useDispatch();
    const history = useHistory();

    const removeFromCart = (e) => {
        e.preventDefault();
        const shopping_cart= member?.orders.filter(order=> order.purchased===false)[0]
        //IF SHOPPING CART HAS MORE THAN ONE PRODUCT(DO NOT NEED TO DELETE FULL ORDER)
        if (shopping_cart.products.length>1) {
        const res = dispatch(deleteFromCart(product.product.id)).catch(res=>console.log(res))
        if (!res.errors) {
            dispatch(authenticate())
            alert('Item removed from shopping cart');
        }else {
            console.log(res.errors);
        }
        } else {
            const res = dispatch(deleteCart(shopping_cart,product.product.id)).catch(res=>console.log(res))
            if (!res.errors) {
                dispatch(authenticate())
                alert('Item removed from shopping cart');
            }else {
                console.log(res.errors);
            }
        }
}
    return (
        <button onClick={removeFromCart}>Remove From Cart</button>
    )
}

export default RemoveFromCart
