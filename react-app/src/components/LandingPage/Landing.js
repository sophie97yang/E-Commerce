import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useHistory, NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { getAllProducts } from '../../store/products';
import customerRevImg from '../../assets/images/customerReviewsImg.png';
import tom from '../../assets/images/TomCat.png';
import jerry from '../../assets/images/jerryMouse.png';
import returnImg from '../../assets/images/freeReturn.png';
import cheeseHeaven from '../../assets/images/cheeseHeaven.png';
import cheeseSell from '../../assets/images/cheeseSell.png';
import manageOrdersImg from '../../assets/images/manageOrdersImg.png';
import aboutusImg from '../../assets/images/aboutUsImg.png';

import "./index.css"

function LandingPage() {
  // const [products, setProducts] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const currentUserRole = currentUser?.seller;
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);


  useEffect(() => {
    dispatch(getAllProducts())
      .catch(res => res)
  }, [dispatch]);

  if (!products) return null;


  const handleBoxClick = (route, userRoleRequired) => {
    const isAuthenticated = currentUser;
    const hasRequiredRole = userRoleRequired === "all" || currentUser?.seller === userRoleRequired;
    const canAccess = (userRoleRequired === "authenticated" && isAuthenticated) || hasRequiredRole;

    if (!canAccess) {
      history.push('/login'); // Redirect to sign-in page if not authorized
    } else {
      history.push(route);
    }
  };

  // Define boxes for rendering
  // Define boxes for rendering based on the wireframe
  const boxes = [
    {
      title: "Cheese Heaven: Every Enthusiasts Super Experience",
      description: "Explore a variety of cheeses",
      image: cheeseHeaven,
      route: "/products",
      userRole: "all",
    },
    {
      title: "Customer Reviews",
      description: "See what our users have to say about our website",
      image: customerRevImg,
      route: "/customersreviews",
      userRole: "all",
    },
    {
      title: "Have cheese to sell?",
      description: "Click here to sell your cheese",
      image: cheeseSell,
      route: "/products/new",
      userRole: "all",
    },
    {
      title: "Free Returns",
      description: "We guarantee the quality of our products",
      image: returnImg,
      route: "/orders/past",
      userRole: "all",
    },
    {
      title: "About Parmazon Prime",
      description: "Learn about our mission and values",
      image: aboutusImg,
      route: "/aboutus",
      userRole: "all",
    },
    {
      title: "Manage Orders",
      description: "View and manage your orders",
      image: manageOrdersImg,
      route: "/orders",
      userRole: "all",
    },
    // {
    //   title: "Top Picks for You",
    //   description: "Personalized recommendations",
    //   route: "/",
    //   userRole: "authenticated",
    // },
  ];


  return (
    <div className="landing-page" >
      {/* style={{ backgroundImage: `url(${backgroundImage})` }} */}
      <h1 className="main-title">Cheese Heaven: Every Enthusiasts Super Experience</h1>

      <div className='image-header-landing'>

        <div className="image-landing">
          <img className="jerry-img" src={jerry} alt="jerry" />
        </div>

        <Carousel className="product-carousel">
          {Object.values(products).map((product, index) => (
            <div key={index}>
              <img src={product.preview_image} alt={product.name} />
              <p className="legend">
                <NavLink to={`/products/${product.id}`}>{product.name}</NavLink>
              </p>

            </div>

          ))}
        </Carousel>

        <div className="image-landing">
          <img className="tom-img" src={tom} alt="tom" />
        </div>

      </div>

      <div className="boxes-container">
        {boxes.map((box, index) => {
          // Determine if the box should be shown based on user role
          const showBox = box.userRole === 'all' ||
            (box.userRole === 'authenticated' && currentUser) ||
            (box.userRole === currentUserRole);

          return showBox ? (
            <div
              key={index}
              className="box"
              onClick={() => handleBoxClick(box.route, box.userRole)}
            >
              <h3>{box.title}</h3>
              {box.image && <img src={box.image} alt={box.title} />}
              <p>{box.description}</p>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );

}

export default LandingPage;
