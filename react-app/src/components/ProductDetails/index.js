import React, { useEffect, useState } from "react";
import { useParams,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
import { addOrder,authenticate,editOrder, removeFromWishlist,addToWishlist, deleteCart, deleteFromCart } from "../../store/session";
import './ProductDetails.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DeleteProduct from '../DeleteProduct';
import DeleteReview from "../DeleteReview";
import OpenModalButton from '../OpenModalButton'
import UpdateReviewForm from "../UpdateReviewFormPage";


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity,setQuantity] = useState(1);

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
  //add to cart callback
  const addToCart = async (e) => {
    e.preventDefault();

    if (!member) {
      history.push('/login')
      return ['Forbidden'];
    }

    const shopping_cart = member.orders.filter(order=> order.purchased===false)[0];
    if (!shopping_cart) {
      const res = await dispatch(addOrder(quantity,id));
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
        for (let i=0; i<wishlist.length;i++) {
          if (wishlist[i].id===id) {
            const res = await dispatch(removeFromWishlist(id));
            if (!res.errors) break;
            else {
              console.log(res);
              break;
            }
          }
        }}
        dispatch(authenticate())
        alert('Successfully added to cart')
        history.push('/orders')
      }
    } else {
      const res = await dispatch(editOrder(quantity,id));
      if (!res.errors) {
          //check wishlist and delete product from wishlist if item is added to shopping cart
          const wishlist = member.products;
          if (wishlist) {
          for (let i=0; i<wishlist.length;i++) {
            if (wishlist[i].id===id) {
              const res = await dispatch(removeFromWishlist(id));
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            }
          }}
        dispatch(authenticate())
        alert('Successfully added to cart')
        history.push('/orders')
      }
    }

  }
//add to wishlist callback
  const AddToWishlist = async () => {

    if (!member) {
      history.push('/login')
      return ['Forbidden'];
    }

    //if product is already in wishlist, alert user and direct them to their wishlist
    const wishlist = member.products;
    for (let i=0;i<wishlist.length;i++) {
      const product = wishlist[i];
      if (product.id===parseInt(id)) {
        alert('Item is already on your wishlist');
        history.push('/orders')
      }
    }

    const res = await dispatch(addToWishlist(parseInt(id))).catch(res=>res);
    if (!res.errors) {
      //check to see if product is in user's shopping cart and remove
      const shopping_cart = member.orders.filter(order=> order.purchased===false)[0];
      if (shopping_cart) {
        for (let i=0;i<shopping_cart.products.length;i++) {
          let product = shopping_cart.products[i];
          console.log('product',product)
          if (product.product.id === parseInt(id)) {
            console.log('hi')
            if (shopping_cart.products.length>1) {
              const res = dispatch(deleteFromCart(parseInt(id))).catch(res=>console.log(res))
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            } else {
                 const res = dispatch(deleteCart(shopping_cart,parseInt(id))).catch(res=>console.log(res))
                 if (!res.errors) break;
                 else {
                  console.log(res);
                  break;
                 }
            }
          }
        }
      }
      dispatch(authenticate())
      alert('Successfully added to wishlist')
      history.push('/orders')
    } else {
      console.log('Failed to add item to wishlist',res)
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
                <button onClick={AddToWishlist}>Add to Wishlist</button>
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
