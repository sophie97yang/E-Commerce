import { useEffect,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link,useHistory } from 'react-router-dom'
import './Orders.css'
import RemoveFromCart from './RemoveFromCart'
import { addToWishlist,deleteCart,deleteFromCart,authenticate, completeTransaction } from '../../store/session'
import { getAllProducts } from '../../store/products';
import hungryMouse from '../../assets/images/tempt-mouse.png'

function ShoppingCart() {
    const sessionUser = useSelector(state => state.session.member)
    const [cart,setCart] = useState([]);
    const [disabled,setDisabled] = useState(false);
    const [cartErr,setCartErr] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

  useEffect(() => {
    const shopping_cart = sessionUser
      ? sessionUser.orders.filter((order) => order.purchased === false)[0]
      : null;
    setCart(shopping_cart ? shopping_cart.products : null);
  }, [sessionUser]);

    useEffect(()=> {
        dispatch(getAllProducts())
    },[dispatch])

    //handle when product is out of stock
    useEffect(()=> {
      if (cart) {
        const out = [];
        let toggle;
        cart.forEach(product=> {
          if (product.product.available<=0 || product.product.available<product.quantity) {
            out.push(product.product.name);
            setDisabled(true);
            toggle=true;
          }
        })
        if (!toggle) setDisabled(false);
        setCartErr(out);

      }
    },[cart])

    console.log(cart);
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
      <>
        <h2 className="shoppingcart-h2">Shopping Cart</h2>

      <div className="shopping-cart">
        <div className='shopping-cart-items'>
          {cart && cart.length ?  <div className='breadcrumbs'id='cart-breadcrumb'>
              <p><Link to='/products'>All Products</Link> {">"} {sessionUser.first_name}'s Cart </p>
            </div> : ""}
        {cart && cart.length ? (
          cart.map((product) => (
            <div key={product.id} className="cart-container">

              <div className="cart-block-1">
                <div>
                  <span>Total</span>
                  <div>{product.product.price}</div>
                </div>

              <div>
                {product.product.available > 0 ? <p id='stock_info'> {product.product.available>2 ?'In Stock' : 'Low Quantity' }</p> : <p id='stock_info-out'>Out of Stock</p>}
              </div>

                <div>
                  <p>Quantity</p>
                  <div>{product.quantity}</div>
                </div>
              </div>

              <div className="block-divider"></div>

              <div className="cart-block-2">
                <div className="cart-block-left">
                  <img
                    src={product.product.preview_image}
                    alt={product.product.name}
                  />
                </div>

                <div className="cart-block-middle">
                <Link
                to={`/products/${product.product.id}`}
                className="product-name-link"
                >
                 {product.product.name}
               </Link>
                  <div className="product-description">{product.product.description}</div>
                </div>

                <div className="cart-block-right">
                  <RemoveFromCart product={product} />
                  <button
                    onClick={() => {
                      AddToWishlist(product);
                    }}
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (

          <div className="empty-cart">
              <h3>You're looking a little hungry...</h3>
              <img src={hungryMouse} alt='hungry mouse'></img>
          </div>


        )}
        </div>


        {
                  cart?.length ? <div className="transaction-container"><div className='transaction-details'>
                      <div> <h4>Your Current Balance:</h4><p> {sessionUser.account_balance.toFixed(2)}</p></div>
                      <div className='transaction-total'><h4>{`Total (${cart.length}`} {cart.length===1 ? 'item)':"items)"}:</h4><p>{total.toFixed(2)}</p></div>
                      <div><h4>Your Balance After Checkout</h4><p>{(sessionUser.account_balance-total).toFixed(2)}</p></div>
                      <button onClick={handleTransaction} className='complete-transaction-button' disabled={disabled}>Checkout</button>
                      {cartErr.length ?<p id='cart-error'>{cartErr.join(',')} {cartErr.length===1? 'is':'are'} out of stock. Please remove from cart before proceeding.</p>: ''}
                      </div></div>: <p className="empty-cart-container"><Link to='/products' className="empty-cart-link">Browse our lovely selection of cheeses</Link></p>
      }

      </div>
      </>
    );
  };
  export default ShoppingCart;
