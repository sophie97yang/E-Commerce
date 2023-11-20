import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useHistory } from 'react-router-dom';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const history = useHistory();

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

  useEffect(() => {
    const imageUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ];
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setBackgroundImage(imageUrls[randomIndex]);
  }, []);

  const handleBoxClick = (route, userRole) => {
    const currentUserRole = getCurrentUserRole(); // Replace with actual logic to get the user's role
  
    if (userRole === 'all' || currentUserRole === userRole) {
      history.push(route);
    } else {
      // Handle unauthorized access, e.g., redirect to a different page or show a message
      console.log('Unauthorized access');
    }
  };
  
  // Define boxes for rendering
  const boxes = [
    { title: 'All Products', route: '/products', userRole: 'all' },
    { title: 'Create Product', route: '/create-product', userRole: 'seller' },
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
      <div className='boxes-container'>
        {boxes.map((box, index) => (
          <div key={index} className='box' onClick={() => handleBoxClick(box.route, box.userRole)}>
            <h3>{box.title}</h3>
            {/* Add other box content */}
          </div>
        ))}
      </div>
      {/* Add other components or elements here */}
    </>
  );
}
export default LandingPage;