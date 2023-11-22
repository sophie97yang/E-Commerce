import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "./AccountPage.css";
import { getAllProducts } from "../../store/products";
import { Link } from "react-router-dom";

function AccountPage() {
  const dispatch = useDispatch();

  //Member
  const member = useSelector((state) => state.session.member);
  console.log('member', member)


  //Member's wishlist
  const wishlist = member.products
  console.log("wishlist", wishlist)


  //Member's seller products
  const productsOBJ = useSelector(state => state.products.products); //users products?
  const allProducts = productsOBJ ? Object.values(productsOBJ) : []
  console.log('productOBJJ', productsOBJ)
  console.log('allProdcutss', allProducts)

  const userProducts = allProducts.filter(
    (product) => product.seller === member.id
  )

  console.log('userProductsss', userProducts)



  //Member's orders
  const membersOrders = member.orders
  console.log("orders", membersOrders)

  const orders = membersOrders.filter(
    (order) => order.purchased === true
  )

  console.log('past orders', orders)


  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  //we need
  // member's orders
  // member's wishlis
  // member's products (if seller)

  // defaultProfilePic = "";

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
        <div>Your Past Orders</div>
{ orders.length ?
        <Carousel className="orders-carousel">
          {orders.map((order, index) => (

            order.products.map((product, index) => (
              <div key={index}>
                <img src={product.product.preview_image} alt={product.product.name} />
                <p className="legend">{product.product.purchase_date}</p>
              </div>

            ))

          ))}
        </Carousel>:
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
