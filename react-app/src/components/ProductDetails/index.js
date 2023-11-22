import React, { useEffect, useState } from "react";
import { useParams,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
import { addOrder,authenticate,editOrder } from "../../store/session";
import './ProductDetails.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DeleteProduct from '../DeleteProduct';
import { removeProduct } from "../../store/products";
import DeleteReview from "../DeleteReview";
import OpenModalButton from '../OpenModalButton'
import UpdateReviewForm from "../UpdateReviewFormPage";
console.log('hi');
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity,setQuantity] = useState(1)
  const [hidden,setHidden] = useState(true)

  const products = useSelector((state) => state.products.products)
  const member = useSelector((state)=>state.session.member)

  const history = useHistory();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (!products) return null;
  //if product doesn't exist redirect them to a product not found page
  const product = products[id];

  if (!product) return history.push('/404')

  // new
  const memberId = member.id

  const sellerId = product.seller
  const isSeller = memberId === sellerId

  const addToCart = async (e) => {
    e.preventDefault();

    if (!member) {
      history.push('/login')
      return ['Forbidden'];
    }

    const shopping_cart = member.orders.filter(order=> order.purchased===false)[0]
    if (!shopping_cart) {
      const res = await dispatch(addOrder(quantity,id));
      if (!res.errors) {
        dispatch(authenticate())
        alert('Successfully added to cart')
        history.push('/orders')
      }
    } else {
      const res = await dispatch(editOrder(quantity,id));
      if (!res.errors) {
        dispatch(authenticate())
        alert('Successfully added to cart')
        history.push('/orders')
      }
    }
  }
  const handleChange = (e)=> {
    e.preventDefault();
    setQuantity(e.target.value)
}

const handleUpdateClick = () => {
  history.push(`/products/${id}/edit`);
};

  return (
    <>
      <div>

        {!product ? (
          <div>Loading...</div>
        ) : (
          <div className="product-content">
            <div className="product-images-box">
              <Carousel className="Carousel-img">
              <div>
                  <img
                    className="product-img"
                    src={product.preview_image}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_image1 ? product.product_image1 : 'https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg'}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_image2 ? product.product_image2 : 'https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg'}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_image3 ? product.product_image3 : 'https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg'}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_image4 ? product.product_image4 : 'https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg'}
                    alt="product"
                  />
                </div>
              </Carousel>
            </div>
            <div className="test">

            {isSeller && (
                <>
                  <button onClick={handleUpdateClick}>Update Product</button>
                </>
              )}

              <div className="product-details">
                <div>{product.name}</div>
                <div>Category: {product.category}</div>
                <div>Description: {product.description}</div>
                <div>Availability: {product.available}</div>
                <div>${product.price}</div>
                <input type='number' min='1' max={`${product.available}`} value={`${quantity}`} onChange={handleChange}  name='quantity'/>
                <button onClick={addToCart}>Add to Cart</button>
            <DeleteProduct product={product} />
              </div>
            </div>

            <div className='product-reviews'>
              <h2>Written Reviews</h2>
              <div>

              </div>
              <div>
                {product.reviews ? product.reviews.map(review => (
                    <div key={review.id}>
                      <h5>{review.headline}</h5>
                      <div>{review.rating}</div>
                      <p>{review.member.first_name} {review.member.last_name}</p>
                      <p>{review.content}</p>
                      <DeleteReview review={review} />
                      <OpenModalButton modalComponent={<UpdateReviewForm review={review}/>} buttonText={"Edit Review"} className={member && (member.id ===  review.member.id) ? '':'edit-hidden'} />
                    </div>


                )): <></>}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default ProductDetails;
