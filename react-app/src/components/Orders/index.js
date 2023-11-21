import Wishlist from './Wishlist'
import ShoppingCart from './ShoppingCart'
function Order({isLoaded}) {
    return (
        <div>
            <ShoppingCart isLoaded={isLoaded} />
            <Wishlist />
        </div>

    )
}

export default Order
