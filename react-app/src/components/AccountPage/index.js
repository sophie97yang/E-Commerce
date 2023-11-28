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
  const wishlist = member.products;

  //Member's seller products
  const productsOBJ = useSelector((state) => state.products.products); //users products?
  const allProducts = productsOBJ ? Object.values(productsOBJ) : [];

  const userProducts = allProducts.filter(
    (product) => product.seller.id === member.id
  );

  //Member's orders
  const membersOrders = member.orders;

  const orders = membersOrders.filter((order) => order.purchased === true);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);


  return (
    <div id="acount-page-container">
      <div id="profile-pic">
        <img src="https://previews.123rf.com/images/jumpingxiii/jumpingxiii2005/jumpingxiii200500151/147906711-cheese-character-design-cheese-on-white-background-mascot.jpg"></img>
      </div>

      <div id="account-container">
        <h1>Hi, {member.first_name}</h1>
        <div>Welcome to your account</div>
        <div>
          {member.address}, {member.city}, {member.state}
        </div>
      </div>

      <div className="navigation-links">
        {member.seller ? (
          <a className="account-buttons" href="/products/new">
            Add a Product
          </a>
        ) : (
          ""
        )}
        <a className="account-buttons" href="/orders/past">
          View/Manage Your Orders
        </a>

        <a class="account-buttons" href="/orders">
          View Your Wishlist
        </a>
      </div>

      <div id="account-orders-container">
        {orders.length ? (
          <>
            <div className="header-your-orders-text">Your Past Orders</div>
            <Carousel className="orders-carousel">
              {orders.map((order, index) =>
                order.products.map((product, index) => (
                  <div key={product.product.id}>
                    <img
                      src={product.product.preview_image}
                      alt={product.product.name}
                    />
                    <p className="legend">
                      <NavLink to={`/products/${product.product.id}`}>
                        {product.product.name}
                      </NavLink>
                    </p>
                  </div>
                ))
              )}
            </Carousel>
          </>
        ) : (
          <div className="noContentText">
            <h2 className="header-your-orders-text">You have no past orders</h2>
            <Link to="/products" className="your-orders-text">
              {" "}
              Let's Change That
            </Link>
          </div>
        )}
      </div>

      <div id="account-wishlist-container">
        {wishlist.length ? (
          <>
            <div className="header-your-orders-text">Your Wishlist</div>
            <Carousel className="wishlist-carousel">
              {wishlist.map((list, index) => (
                <div key={index}>
                  <img src={list.preview_image} alt={list.name} />
                  <p className="legend">
                    {" "}
                    <NavLink to={`/products/${list.id}`}>{list.name}</NavLink>
                  </p>
                </div>
              ))}
            </Carousel>
          </>
        ) : (
          <div className="noContentText">
            <h2 className="header-your-orders-text">You have no wishlist</h2>
            <Link to="/products" className="your-orders-text">
              {" "}
              Let's Change That
            </Link>
          </div>
        )}
      </div>

      {member.seller && (
        <div id="account-products-container">
          {userProducts.length ?
          <>
          <div className="header-your-orders-text">Your Products</div>
          <Carousel className="products-carousel">
            {userProducts.map((product, index) => (
              <div key={index}>
                <img src={product.preview_image} alt={product.name} />
                <p className="legend">
                  <NavLink to={`/products/${product.id}`}>
                    {product.name}
                  </NavLink>
                </p>
              </div>
            ))}
          </Carousel>
          </> :
          <div className="noContentText">
          <h2 className="header-your-orders-text">You are selling no products</h2>
          <Link to="/products/new" className="your-orders-text">
            {" "}
            Let's Change That
          </Link>
        </div>}
        </div>
      )}
    </div>
  );
}

export default AccountPage;
