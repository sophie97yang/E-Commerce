import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles


function LandingPage() {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const currentUserRole = useSelector((state) => state.session.user?.role); // Get the user role at the top level

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/all');
        const data = await response.json();
        setProducts(data.products); // Adjust based on the response structure
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  const handleBoxClick = (route, userRole) => {
    if (userRole === "all" || currentUserRole === userRole) {
      history.push(route);
    } else {
      console.log("Unauthorized access");
    }
  };

  // Define boxes for rendering
  const boxes = [
    { title: "All Products", route: "/products", userRole: "all" },
    { title: "Create Product", route: "/create-product", userRole: "seller" },
    // Add more boxes
  ];

  return (
    <>
      <Carousel>
        {products.map((product, index) => (
          <div key={index}>
            <img src={product.imageUrl} alt={product.name} />
            <p className="legend">{product.name}</p>
          </div>
        ))}
      </Carousel>

      <div className="boxes-container">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="box"
            onClick={() => handleBoxClick(box.route, box.userRole)}
          >
            <h3>{box.title}</h3>
          </div>
        ))}
      </div>
      {/* ... rest of your JSX ... */}
    </>
  );
}

export default LandingPage;
