import React, { useState, useEffect} from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useHistory,NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import {getAllProducts} from '../../store/products'
// import "./index.css"

function LandingPage() {
  // const [products, setProducts] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const currentUserRole = currentUser?.seller;
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);


  useEffect(()=> {
    dispatch(getAllProducts())
    .catch(res => res)
  },[dispatch]);

  if (!products) return null;

  //   Set a random background image
  //   const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  //   setBackgroundImage(backgroundImages[randomIndex]);
  // }, []);

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
      route: "/products",
      userRole: "all",
    },
    {
      title: "Get your holiday gifts on time.",
      description: "Only at Parmazon-Prime. The perfect place to enjoy cheese",
      route: "/",
      userRole: "all",
    },
    {
      title: "Have cheese to sell?",
      description: "Click here to sell your cheese",
      route: "/products/new",
      userRole: "seller",
    },
    {
      title: "Free Returns",
      description: "We guarantee the quality of our products",
      route: "/orders/past",
      userRole: "all",
    },
    {
      title: "About Parmazon Prime",
      description: "Learn about our mission and values",
      route: "/",
      userRole: "all",
    },
    {
      title: "Manage Orders",
      description: "View and manage your orders",
      route: "/orders",
      userRole: "authenticated", // Assuming 'authenticated' means any signed-in user
    },
    {
      title: "Top Picks for You",
      description: "Personalized recommendations",
      route: "/",
      userRole: "authenticated",
    },
  ];


  return (
    <div className="landing-page" >
      {/* style={{ backgroundImage: `url(${backgroundImage})` }} */}
      <h1 className="main-title">Cheese Heaven: Every Enthusiasts Super Experience</h1>

      <Carousel className="product-carousel">
        {Object.values(products).map((product, index) => (
          <div key={index}>
            <img src={product.preview_image} alt={product.name} />
            <p className="legend">{product.name}</p>
          </div>
        ))}
      </Carousel>

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
              <p>{box.description}</p>
            </div>
          ) : null;
        })}
      </div>

      {/* Other sections based on the wireframe */}
      <div className="about-section">
        <h2>About Parmazon Prime</h2>
        <p>Learn about our mission, values, and the cheesy experience designed around you.</p>
      </div>

      {/* Footer */}
      <footer className="landing-page-footer">
        <p>&copy; {new Date().getFullYear()} Parmazon Prime</p>
      </footer>
    </div>
  );

}

export default LandingPage;
