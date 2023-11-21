//STILL NEEDS ALOT OF WORK
//NOT SURE IF CAROUSEL IS WORKING PROPERLY

import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "./AccountPage.css";

function AccountPage() {
  const member = useSelector((state) => state.session.member);


  //Don't these come back as objects?

  const ordersOBJ = useSelector(state => state.orders);
  const wishlistOBJ = useSelector(state => state.wishlist);//wishlist.all??
  const productsOBJ = useSelector(state => state.products);

  console.log("ORDERS ", orders)

  const orders = Object.values(ordersOBJ)
  const wishlist = Object.values(wishlistOBJ)
  const products = Object.values(productsOBJ)



  return (

    <div id="acount-page-container">


      <div id="profile-pic">
        <img src=""></img>
      </div>


      <div id="account-container">
        <h1>Welcome to your account</h1>
        <div>Hi, {member.first_name}</div>
        <div>
          {member.address}, {member.city}, {member.state}
        </div>
      </div>

      <div id="account-orders-container">
        <div>Your Orders</div>

        <Carousel className="orders-carousel">
          {orders.map((order, index) => (
            <div key={index}>
              {/* <img src={order.imageUrl} alt={order.name} /> */}
              <p className="legend">{order.name}</p>
            </div>
          ))}
        </Carousel>

      </div>


      <div id="account-wishlist-container">
        <div>Your Wishlist</div>

        {/* <Carousel className="wishlist-carousel">
          {wishlist.map((list, index) => (
            <div key={index}>
              <img src={list.imageUrl} alt={list.name} />
              <p className="legend">{list.name}</p>
            </div>
          ))}
        </Carousel> */}

      </div>


      {member.seller && (
        <div id="account-products-container">
          <div>Your Products</div>

          <Carousel className="products-carousel">
            {products.map((product, index) => (
              <div key={index}>
                <img src={product.imageUrl} alt={product.name} />
                <p className="legend">{product.name}</p>
              </div>
            ))}
          </Carousel>

        </div>
      )}


      </div>


  );
}

export default AccountPage;
