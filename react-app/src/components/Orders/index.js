import Wishlist from './Wishlist'
import ShoppingCart from './ShoppingCart'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Order({isLoaded}) {
    const member= useSelector(state => state.session.member);
    const history = useHistory();

    if (isLoaded && !member) {
        history.push('/login')
        return null;
    }
    return (
        <div>
            <ShoppingCart />
            <Wishlist />
        </div>

    )
}

export default Order
