import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "./AccountPage.css";
import { getAllProducts } from "../../store/products";
import { Link, NavLink } from "react-router-dom";

function AccountPage() {
  const dispatch = useDispatch();

  //Member
  const member = useSelector((state) => state.session.member);


  //Member's wishlist
  const wishlist = member.products


  //Member's seller products
  const productsOBJ = useSelector(state => state.products.products); //users products?
  const allProducts = productsOBJ ? Object.values(productsOBJ) : []


  const userProducts = allProducts.filter(
    (product) => product.seller === member.id
  )


  //Member's orders
  const membersOrders = member.orders


  const orders = membersOrders.filter(
    (order) => order.purchased === true
  )



  useEffect(() => {
    dispatch(getAllProducts());
  }, []);


  // defaultProfilePic = "";

  return (

    <div id="acount-page-container">


      <div id="profile-pic">
        <img src="https://previews.123rf.com/images/jumpingxiii/jumpingxiii2005/jumpingxiii200500151/147906711-cheese-character-design-cheese-on-white-background-mascot.jpg"></img>
      </div>


      <div id="account-container">
        <h1>Welcome to your account</h1>
        <div>Hi, {member.first_name}</div>
        <div>
          {member.address}, {member.city}, {member.state}
        </div>
      </div>

      <li><NavLink to='/products/new'>Add a Product</NavLink></li>
      <li><NavLink to='/orders/past'>View/Manage Your Orders</NavLink></li>
      <li><NavLink to='/reviews'>View Your Reviews</NavLink></li>
      <li><NavLink to='/wishlist'>View Your Wishlist</NavLink></li>
      <li><NavLink to='/products'>View Your Products</NavLink></li>


      <div id="account-orders-container">
        <div>Your Past Orders</div>
        {orders.length ?
          <Carousel className="orders-carousel">
            {orders.map((order, index) => (

              order.products.map((product, index) => (
                <div key={index}>
                  <img src={product.product.preview_image} alt={product.product.name} />
                  <p className="legend">{product.product.purchase_date}</p>
                </div>

              ))

            ))}
          </Carousel> :
          <div>
            <h2>You have no past orders</h2>
            <Link to='/products'> Let's Change That</Link>
          </div>
        }


      </div>


      <div id="account-wishlist-container">
        <div>Your Wishlist</div>
        {wishlist.length ?
          <Carousel className="wishlist-carousel">
            {wishlist.map((list, index) => (
              <div>

                <div key={index}>
                  <img src={list.preview_image} alt={list.name} />
                  <p className="legend">{list.name}</p>
                </div>


              </div>
            ))}
          </Carousel>
          :
          <div>
            <h2>You have no wishlist</h2>
            <Link to='/products'> Let's Change That</Link>
          </div>
        }

      </div>


      {member.seller && (
        <div id="account-products-container">
          <div>Your Products</div>

          <Carousel className="products-carousel">
            {userProducts.map((product, index) => (
              <div key={index}>
                <img src={product.preview_image} alt={product.name} />
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
