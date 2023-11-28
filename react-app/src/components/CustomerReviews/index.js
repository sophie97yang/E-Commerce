import React from 'react';
import customer1 from '../../assets/images/customer1.jpeg';
import customer2 from '../../assets/images/customer2.jpg';
import customer3 from '../../assets/images/customer3.jpg';
import customer4 from '../../assets/images/customer4.jpeg';
import customer5 from '../../assets/images/customer5.jpeg';
import customer6 from '../../assets/images/customer6.jpg';
import customer7 from '../../assets/images/customer7.jpg';
import customer8 from '../../assets/images/customer8.jpg';
import customer9 from '../../assets/images/customer9.jpg';
import customer10 from '../../assets/images/customer10.jpg';

import './CustomerReviews.css';

const reviewsData = [
  {
    id: 1,
    name: 'Dwayne Johnson',
    avatar: customer1,
    role: 'customer',
    review: 'Parmazon Prime is the real deal! They have the cheesiest collection I have ever seen. Highly recommended!',
  },
  {
    id: 2,
    name: 'Beyonce',
    avatar: customer2,
    role: 'customer',
    review: "Parmazon Prime is not just an online marketplace; it's an amazing place for cheese enthusiasts. The quality and variety of cheeses are unmatched. A delightful experience for cheese lovers!",
  },
  {
    id: 3,
    name: 'Taylor Swift',
    avatar: customer3,
    role: 'seller',
    review: "I'm enchanted by Parmazon Prime! Selling cheese has never been more easier!",
  },
  {
    id: 4,
    name: 'Ryan Reynolds',
    avatar: customer4,
    role: 'seller',
    review: 'Selling my signature cheese on Parmazon Prime has been incredible. The platform is user-friendly!',
  },
  {
    id: 5,
    name: 'Simu Liu',
    avatar: customer5,
    role: 'seller',
    review: 'Parmazon Prime is my superhero landing for selling cheese. The community and support are as epic as a Marvel blockbuster!',
  },
  {
    id: 6,
    name: 'Keanu Reeves',
    avatar: customer6,
    role: 'customer',
    review: 'Whoa! Parmazon Prime is like stepping into the Matrix of cheese. Excellent selection, and it keeps getting better!',
  },
  {
    id: 7,
    name: 'Zendaya',
    avatar: customer7,
    role: 'customer',
    review: 'Parmazon Prime is a cheese sensation! The platform brings elegance and flavor to my cheese preferences.',
  },
  {
    id: 8,
    name: 'Jackie Chan',
    avatar: customer8,
    role: 'customer',
    review: 'Parmazon Prime has added a kick to my cheese-selling journey. The platform is as exceptional as my martial arts skills!',
  },
  {
    id: 9,
    name: 'Lebron James',
    avatar: customer9,
    role: 'customer',
    review: 'Parmazon Prime is my slam dunk for cheese shopping. The MVP of online cheese marketplaces!',
  },
  {
    id: 10,
    name: 'Drake',
    avatar: customer10,
    role: 'seller',
    review: 'Parmazon Prime has become the soundtrack of my cheese-shopping experience. The variety is as diverse as my music!',
  },
];

const CustomerReviews = () => {
  return (
    <div className="customer-reviews-container">
      <h2>Customer Reviews</h2>
      <div className="customers-reviews-list">
        {reviewsData.map((review) => (
          <div key={review.id} className="customers-review-item">
            <img src={review.avatar} alt={`${review.name}'s avatar`} className="avatar" />
            <div className="customers-review-content">
              <h3>{review.name}</h3>
              <p>{review.role === 'seller' ? 'Seller: ' : 'Customer: '}{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
