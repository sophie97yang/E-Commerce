import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  addOrder,
  removeFromWishlist,
  authenticate,
  editOrder,
} from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import HandleReturn from "./HandleReturn";

function OrderProductDetails({ product, date }) {
  const date_difference = Math.abs(
    (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  let delivered;
  if (date_difference >= 2) delivered = true;

  const member = useSelector((state) => state.session.member);
  const dispatch = useDispatch();
  const history = useHistory();

  const BuyItAgain = async (e) => {
    e.preventDefault();
    const quantity = 1;
    const shopping_cart = member.orders.filter(
      (order) => order.purchased === false
    )[0];
    if (!shopping_cart) {
      const res = await dispatch(addOrder(quantity, product.product.id));
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === product.product.id) {
              const res = await dispatch(
                removeFromWishlist(product.product.id)
              );
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            }
          }
        }
        dispatch(authenticate());
        history.push("/orders");
      }
    } else {
      const res = await dispatch(editOrder(quantity, product.product.id));
      // dispatch(getAllProducts())
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === product.product.id) {
              const res = await dispatch(
                removeFromWishlist(product.product.id)
              );
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            }
          }
        }
        dispatch(authenticate());
        history.push("/orders");
      }
    }
  };

  const TrackPackage = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon!");
  };

  const WriteReview = (e) => {
    e.preventDefault();
    history.push(`/products/${product.product.id}/reviews/new`);
  };

  return (
    <div className="order-product-details">
      <div className="order-block-1">

        <div>
          {" "}
          <span>Total</span>
          <div>{(product.product.price*product.quantity).toFixed(2)}</div>
        </div>

        <div>
          {" "}
          <span>Quantity</span>
          <div>{product.quantity}</div>
        </div>


      </div>

      <div className="block-divider"></div>

      <div className="order-block-2">
        <div className="order-block-left">
         {!product.returned ?  <h4>{delivered ? "Delivered" : "Order Processing"}</h4> : <h4>Returned</h4>}
          <Link
            to={`/products/${product.product.id}`}
            className="product-name-link"
          > <img src={product.product.preview_image} alt={product.product.name} />
          </Link>
        </div>

        <div className="order-block-middle">
          <Link
            to={`/products/${product.product.id}`}
            className="product-name-link"
          >
            {product.product.name}
          </Link>
          <div className="product-description">
            {product.product.description}
          </div>

          {product.product.available ? <button className="buy-again-button" onClick={BuyItAgain}>
            {" "}
            Buy it again{" "}
          </button>
          :
          <button className="buy-again-button" disabled={true}>
          {" "}
          Buy it again{" "}
        </button>}
        </div>

        <div className="order-block-right">
          <button id="orderButt" onClick={TrackPackage}>Track Package</button>
          <OpenModalButton
            modalComponent={<HandleReturn product={product} />}
            buttonText="Make a Return"
            className={!product.returned ? "return_button": "return_button_hidden"}
          />
          <button id="orderButt" onClick={WriteReview}>Write a Review</button>
        </div>
      </div>
    </div>
  );
}

export default OrderProductDetails;
