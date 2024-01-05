import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
import {
  addOrder,
  authenticate,
  editOrder,
  removeFromWishlist,
  addToWishlist,
  deleteCart,
  deleteFromCart,
} from "../../store/session";
import "./ProductDetails.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DeleteProduct from "../DeleteProduct";
import DeleteReview from "../DeleteReview";
import OpenModalButton from "../OpenModalButton";
import UpdateReviewForm from "../UpdateReviewFormPage";
import ManageReview from "../ManagementModal/ManageReview";
import UpdateProductImage from "./UpdateProductImage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { MinimumAdd, LowStock } from "./QuantityWarnings";
import { useModal } from "../../context/Modal";
import RatingDistribution from "./RatingDistribution";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [hidden, setHidden] = useState(true);
  const modalRef = useRef();

  const products = useSelector((state) => state.products.products);
  const member = useSelector((state) => state.session.member);
  const { setModalContent } = useModal();


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (!products) return null;
  //if product doesn't exist redirect them to a product not found page
  const product = products[id];
  if (!product) return history.push("/404");

  //refactor product name to capitalize first letter and fix display price
  const product_name = product.name[0].toUpperCase() + product.name.slice(1);
  const product_price_split = product.price.toString().split(".")[1];
  let new_product_price = product.price;
  if (!product_price_split) {
    new_product_price = product.price.toString() + ".00";
  } else if (product_price_split.toString().length != 2) {
    product.price = product.price.toString() + "0";
  }
  //refactor product ratings to show stars
  let product_average_rating;
  if (product.rating_sum) {
    product_average_rating = Math.floor(
      product.rating_sum / product.reviews.length
    );
    product.average_rating = "";
    for (let i = 0; i < product_average_rating; i++) {
      product.average_rating += "🧀";
    }
  }
  //refactor each review rating to show stars
  product.reviews.forEach((review) => {
    review.stars = "";
    for (let i = 0; i < review.rating; i++) {
      review.stars += "🧀";
    }
  });

  //add to cart callback
  const addToCart = async (e) => {
    e.preventDefault();

    //if user is not authenticated, redirect them
    if (!member) {
      history.push("/login");
      return ["Forbidden"];
    }

    //check validity of quantity data
    if (!quantity || quantity <= 0) {
      setModalContent(<MinimumAdd />);
      return null;
    }

    if (quantity > product.available) {
      setModalContent(<LowStock product={product} />);
      return null;
    }

    const shopping_cart = member.orders.filter(
      (order) => order.purchased === false
    )[0];

    if (!shopping_cart) {
      const res = await dispatch(addOrder(quantity, id));
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === id) {
              const res = await dispatch(removeFromWishlist(id));
              if (!res.errors) break;
              else {
                break;
              }
            }
          }
        }
        dispatch(authenticate());
        history.push("/orders");
      }
    } else {
      const res = await dispatch(editOrder(quantity, id));
      // dispatch(getAllProducts())
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === id) {
              const res = await dispatch(removeFromWishlist(id));
              if (!res.errors) break;
              else {
                break;
              }
            }
          }
        }
        dispatch(authenticate());
        history.push("/orders");
      }
    }
  };
  //add to wishlist callback
  const AddToWishlist = async () => {
    if (!member) {
      history.push("/login");
      return ["Forbidden"];
    }

    //if product is already in wishlist, alert user and direct them to their wishlist
    const wishlist = member.products;
    for (let i = 0; i < wishlist.length; i++) {
      const product = wishlist[i];
      if (product.id === parseInt(id)) {
        alert("Item is already on your wishlist");
        history.push("/orders");
      }
    }

    const res = await dispatch(addToWishlist(parseInt(id))).catch((res) => res);
    if (!res.errors) {
      //check to see if product is in user's shopping cart and remove
      const shopping_cart = member.orders.filter(
        (order) => order.purchased === false
      )[0];
      if (shopping_cart) {
        for (let i = 0; i < shopping_cart.products.length; i++) {
          let product = shopping_cart.products[i];
          if (product.product.id === parseInt(id)) {
            if (shopping_cart.products.length > 1) {
              const res = dispatch(deleteFromCart(parseInt(id))).catch((res) =>res);
              if (!res.errors) break;
              else {
                break;
              }
            } else {
              const res = dispatch(
                deleteCart(shopping_cart, parseInt(id))
              ).catch((res) => res);
              if (!res.errors) break;
              else {
                break;
              }
            }
          }
        }
      }
      dispatch(authenticate());
      history.push("/orders");
    } else {
      console.log("Failed to add item to wishlist");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const handleUpdateClick = () => {
    history.push(`/products/${id}/edit`);
  };







  const hasReviewed = product.reviews.some(review =>
    String(review.member.id) === String(member?.id)
  );







  const hasPurchased = member?.orders.some(order =>
    order.purchased && order.products.some(orderDetail =>
      String(orderDetail.product.id) === String(id)
    )
  );



  const handleReviewClick = () => {
    if (!member) {
      alert("It would brie a gouda idea to SIGN UP first");
      return;
    }




    if (hasReviewed) {
      alert("You have already reviewed this product.");
      return;
    }




    if (!hasPurchased) {
      alert("You need to purchase this product before reviewing it.");
      return;
    }

    // Redirect to the review submission page... make sure route is correct
    history.push(`/products/${id}/reviews/new`);
  };

  // const calculateRatingsDistribution = (reviews) => {
  //   const distribution = {};
  //   reviews.forEach(review => {
  //     distribution[review.rating] = (distribution[review.rating] || 0) + 1;
  //   });
  //   return Object.entries(distribution).map(([stars, count]) => ({ stars, count }));
  // };

  const calculateRatingsDistribution = (reviews) => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
      if (distribution.hasOwnProperty(review.rating)) {
        distribution[review.rating]++;
      }
    });

    return Object.entries(distribution)
      .map(([stars, count]) => ({ stars: parseInt(stars), count }))
      .sort((a, b) => b.stars - a.stars);
  };

  const ratingsDistribution = calculateRatingsDistribution(product.reviews);

  return (
    <>
      <div>
        {!product ? (
          <div>Loading...</div>
        ) : (
          <div className="product-content">
            <div id="flex-display-pd">
              <div className="breadcrumbs">
                <p>
                  <Link to="/products">All Products</Link> {">"} {product.name}{" "}
                </p>
              </div>
              <div className="product-images-box">
                <Carousel className="Carousel-img">
                  <div>
                    <img
                      className="product-img"
                      src={product.preview_image}
                      alt="product"
                    onError={e => { e.currentTarget.src = "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"; }}
                    />
                    {member && member.id === product.seller.id ? (
                      <OpenModalButton
                        modalComponent={
                          <UpdateProductImage
                            product={product}
                            type={"preview"}
                          />
                        }
                        buttonText="Update Product Image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <img
                      className="product-img"
                      src={
                        product.product_image1
                          ? product.product_image1
                          : "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"
                      }
                      alt="product"
                    onError={e => { e.currentTarget.src = "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"; }}
                    />
                    {member && member.id === product.seller.id ? (
                      <OpenModalButton
                        modalComponent={
                          <UpdateProductImage product={product} type={1} />
                        }
                        buttonText="Update Product Image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <img
                      className="product-img"
                      src={
                        product.product_image2
                          ? product.product_image2
                          : "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"
                      }
                      alt="product"
                    onError={e => { e.currentTarget.src = "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"; }}
                    />
                    {member && member.id === product.seller.id ? (
                      <OpenModalButton
                        modalComponent={
                          <UpdateProductImage product={product} type={2} />
                        }
                        buttonText="Update Product Image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <img
                      className="product-img"
                      src={
                        product.product_image3
                          ? product.product_image3
                          : "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"
                      }
                      alt="product"
                    onError={e => { e.currentTarget.src = "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"; }}
                    />
                    {member && member.id === product.seller.id ? (
                      <OpenModalButton
                        modalComponent={
                          <UpdateProductImage product={product} type={3} />
                        }
                        buttonText="Update Product Image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <img
                      className="product-img"
                      src={
                        product.product_image4
                          ? product.product_image4
                          : "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"
                      }
                      alt="product"
                    onError={e => { e.currentTarget.src = "https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg"; }}
                    />
                    {member && member.id === product.seller.id ? (
                      <OpenModalButton
                        modalComponent={
                          <UpdateProductImage product={product} type={4} />
                        }
                        buttonText="Update Product Image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </Carousel>
              </div>
            </div>
            <div className="test">
              {member && member.seller && member.id === product.seller.id && (
                <>
                  <button onClick={handleUpdateClick}>Update Product</button>
                  <DeleteProduct product={product} />
                </>
              )}

              <div className="product-seller-info">
                <h3>
                  Seller: {product.seller.first_name} {product.seller.last_name}
                </h3>
                <p>
                  Delivering from: {product.seller.city}, {product.seller.state}
                </p>
              </div>

              <div className="product-details">
                <div id="product-detail-name">{product_name}</div>
                <div>Category: {product.category}</div>
                <div>Description: {product.description}</div>
                <div>Availability: {product.available}</div>
                <div>${new_product_price}</div>
                {!(
                  member &&
                  member.seller &&
                  member.id === product.seller.id
                ) && (
                  <div>
                    <label>
                      {" "}
                      Quantity:
                      {product.available ? (
                        <input
                          type="number"
                          min={1}
                          max={`${product.available}`}
                          value={`${quantity}`}
                          onChange={handleChange}
                          name="quantity"
                        />
                      ) : (
                        ""
                      )}
                    </label>
                    <div className="actionButtons">
                      {member ? (
                        <>
                          {product.available ? (
                            <button onClick={addToCart}>Add to Cart</button>
                          ) : (
                            <button disabled={true}>Add to Cart</button>
                          )}
                        </>
                      ) : (
                        <>
                          <button disabled={true}>Add to Cart</button>
                        </>
                      )}
                      {member ? (
                        <button onClick={AddToWishlist}>Add to Wishlist</button>
                      ) : (
                        <button disabled={true}>Add to Wishlist</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="product-reviews">
              <div className="reviewsTop">
                <h2>Reviews</h2>
                <p>Ordered by:<span> Date - Most to Least Recent</span></p>
                <h4>
                  {product.rating_sum
                    ? ` ${product.average_rating} ${(
                        product.rating_sum / product.reviews.length
                      )
                        .toString()
                        .slice(0, 4)} ||| ${product.reviews.length} ratings `
                    : "No Reviews Yet"}
                </h4>
                {!member || member.id === product.seller.id ? (
                  ""
                ) : (
                  <button onClick={handleReviewClick}>Add Review</button>
                )}
              </div>
              <div></div>
              <RatingDistribution ratings={ratingsDistribution} />
              <div>
                {product.reviews ? (
                  product.reviews.sort((rev1,rev2)=>-(new Date(rev1)-new Date(rev2))).map((review) => (
                    <div key={review.id} className="product-detail-review">
                      {review.review_image ? (
                        <img
                          src={review.review_image}
                          style={{ height: "100px", width: "100px;"}} onError={e => { e.currentTarget.src = "your_image_not_found_defalt_picture_here";  }}
                        />
                      ) : (
                        ""
                      )}
                      <h5>{review.headline}</h5>
                      <div>{review.stars}</div>
                      <p id="author-review">
                        {review.member.first_name} {review.member.last_name}
                      </p>
                      <p>{review.content}</p>

                      {/* manage Review */}
                      <OpenModalButton
                        modalComponent={<ManageReview review={review} />}
                        buttonText={"Manage Review"}
                        className={
                          member && member.id === review.member.id
                            ? ""
                            : "edit-hidden"
                        }
                      />

                      {/* <DeleteReview review={review} />
                    <OpenModalButton modalComponent={<UpdateReviewForm review={review} />} buttonText={"Edit Review"} className={member && (member.id === review.member.id) ? '' : 'edit-hidden'} /> */}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
