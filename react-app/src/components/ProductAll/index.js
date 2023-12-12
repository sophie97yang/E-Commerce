import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAllProducts } from "../../store/products";
import { addOrder, authenticate, editOrder, removeFromWishlist, addToWishlist, deleteCart, deleteFromCart } from "../../store/session";
import { Link } from "react-router-dom";
import './ProductAll.css';
import truckImg from '../../assets/images/truckIcon.jpg';
import memory from '../../assets/images/charcuterie.jpeg';

const ProductAll = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productsObj = useSelector((state) => state.products.products);

  const member = useSelector(state => state.session.member);
  const [productList,setProducts] = useState(null);
  const [filterByCategory,setCategory] = useState('All');
  const [categoryOn,setCategoryOn]=useState(false);
  const [filterByReviews,setReview] = useState('All');
  const [reviewOn,setReviewOn]=useState(false);
  const [filterByStock,setStock] = useState('All');
  const [stockOn,setStockOn] = useState(false);
  console.log(productList);
  console.log(filterByReviews,reviewOn);

  useEffect(()=> {
    dispatch(getAllProducts());
  },[dispatch])

  useEffect(()=> {
    if (productsObj) {
      setProducts(Object.values(productsObj))
    }
  },[productsObj])


  useEffect(()=> {
    if (productsObj) {
    if (filterByCategory==='All') {
      setProducts(Object.values(productsObj));
    }
    else {
      if (!categoryOn) {
      setProducts(productList.filter(obj=> obj.category===filterByCategory))
      setCategoryOn(true);
      } else {
        setReview('All');
        setReviewOn(false);
        setStock('All');
        setStockOn(false);
        setProducts(Object.values(productsObj).filter(obj=>obj.category===filterByCategory));
      }
    }
  }
  },[filterByCategory])

  useEffect(()=> {
    if (productsObj) {
    if (filterByReviews==='All') {
      setProducts(Object.values(productsObj));
    }
    else {
      if (!reviewOn) {
      setProducts(productList.filter(obj=> Number(obj.rating_sum/obj.reviews?.length)>=filterByReviews));
      setReviewOn(true);
    }
      else {
        setCategory('All');
        setCategoryOn(false);
        setStock('All');
        setStockOn(false);
        setProducts(Object.values(productsObj).filter(obj=> Number(obj.rating_sum/obj.reviews?.length)>=filterByReviews))
      }
    }
  }},[filterByReviews])

  useEffect(()=> {
    if (productsObj) {
    if (filterByStock==='All') {
      setProducts(Object.values(productsObj));
    }
    else {
      if (!stockOn) {
      setProducts(productList.filter(obj=> obj.available>0));
      setStockOn(true);
    }
      else {
        setCategory('All');
        setCategoryOn(false);
        setReview('All');
        setReviewOn(false);
        setProducts(Object.values(productsObj).filter(obj=> obj.available>0))
      }
    }
  }},[filterByStock])

  //refactor product name to capitalize first letter and price display
  //refactor to include review stars inside product object!
  productList?.forEach(product => {
    if (product) {
      product.name = product.name[0].toUpperCase() + product.name.slice(1);
      const product_price_split = product.price.toString().split('.')[1];
      if (!product_price_split) {
        product.price = product.price.toString() + ".00"
      }
      else if (product_price_split.toString().length!=2) {
        product.price = product.price.toString() + "0"
      }
      if (product.rating_sum) {
        const product_average_rating = Math.floor(product.rating_sum / product.reviews.length);
        product.average_rating = ''
        for (let i = 0; i < product_average_rating; i++) {
          product.average_rating += '★'
        }
      }
    }
  })
  //BONUS: FILTERING AND ORDERING BY

  //handle Add Cart Callback
  const handleAddCart = async (productId) => {
    if (!member) {
      history.push('/login')
      return ['Forbidden'];
    }
    const shopping_cart = member.orders.filter(order => order.purchased === false)[0];

    if (!shopping_cart) {
      const res = await dispatch(addOrder(1, productId));
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === productId) {
              const res = await dispatch(removeFromWishlist(productId));
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            }
          }
        }
        dispatch(authenticate());
        history.push('/orders')
      }
    } else {
      const res = await dispatch(editOrder(1, productId));
      // dispatch(getAllProducts())
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === productId) {
              const res = await dispatch(removeFromWishlist(productId));
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            }
          }
        }
        dispatch(authenticate())
        history.push('/orders')
      }
    }

  }

  return (
    <main>
      <div>
        <h1>Products</h1>
        <div className='breadcrumbs' id='breadcrumb-padding'>
              <p><Link to='/'>Home</Link> {">"} All Products </p>
            </div>
      </div>

      <div className="product-square">

        <div className="product-left">
          <div className="product-left-outer-square">
            <div className="product-left-inner-square">
              <h1>Get your holiday gifts on time.</h1>
              <div className="image-product">
                <img className="truck" src={truckImg} alt="truck" />
              </div>
            </div>
            <div className="product-left-inner-square">
              <h1>Create memories with every purchase</h1>
              <div className="image-product">
                <img className="memory" src={memory} alt="memory" />
              </div>
            </div>
            <div>
              <h2>Filters</h2>
              <button
              onClick={()=> {
                setCategory('All');
                setCategoryOn(false);
                setReview('All');
                setReviewOn(false);
              }}
              >
               Remove All Filters
              </button>
              <div className='filter-by'>
                <h4>Filter by Category</h4>
                {/* <button onClick={(e)=> setCategory("Fresh")}>Fresh</button>
                <button onClick={(e)=> setCategory("Bloomy Rind")}>Bloomy Rind</button>
                <button onClick={(e)=> setCategory("Washed Rind")}>Washed Rind</button> */}
                <select
                value={filterByCategory}
                onChange={(e)=>{
                  setCategory(e.target.value);
                }
                }
                >
                  <option value={'All'} disabled>Select a category...</option>
                  <option value={'Fresh'}>Fresh</option>
                  <option value={'Bloomy Rind'}>Bloomy Rind</option>
                  <option value={'Washed Rind'}>Washed Rind</option>

                </select>
              </div>

              <div className='filter-by'>
                <h4>Filter by Customer Reviews</h4>
               {/*  <button onClick={(e)=> setReview(4)}>★★★★ & Up</button>
                <button onClick={(e)=> setReview(3)}>★★★ & Up</button>
                <button onClick={(e)=> setReview(2)}>★★ & Up</button>
                <button onClick={(e)=> setReview(1)}>★ & Up</button> */}
                <select
                value={filterByReviews}
                onChange={(e)=>{
                  setReview(e.target.value);
                }
                }
                >
                  <option value={'All'} disabled>Select a rating...</option>
                  <option value={4}>★★★★ & Up</option>
                  <option value={3}>★★★ & Up</option>
                  <option value={2}>★★ & Up</option>
                  <option value={1}>★ & Up</option>

                </select>
              </div>

              <div className='filter-by'>
                <h4>Filter by Availability</h4>
                <select
                value={filterByStock}
                onChange={(e)=>{
                  setStock(e.target.value);
                }
                }
                >
                  <option value={'All'}>Include Out of Stock</option>
                  <option value={'In-Stock'}>In-Stock Only</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        <div className="product-right">
          <div className="product-right-inner-square">
            <h1>Cheese Collection</h1>
          </div>
          {member && member.seller ? <button onClick={
            (e) => {
              e.preventDefault();
              history.push('/products/new');
            }
          }> Add a Product</button> : ""}



          <ul className="products-list">
            {productList &&
              productList.map((product) => (
                <div key={product.id} title={product.name} className={!product.available ? 'product_hidden' : ''}>
                  <div className="product-ind-box">
                    <Link to={`/products/${product.id}`}>
                      <div>
                        <img src={product.preview_image} alt="product" className="product-img" />
                      </div>
                      <div className="product-summary">
                        <li>{product.name}</li>
                        <li>${product.price}</li>
                        <li>{product.rating_sum ? `${product.average_rating} ${product.reviews.length}` : "No Reviews Yet"}</li>
                      </div>
                    </Link>
                    {product.available ? <div>{!member || !(member?.seller && product.seller.id === member.id) ? <button onClick={() => { handleAddCart(product.id) }}>Add to Cart</button> : <></>}</div> : <div className='out-of-stock'><p>Out of Stock</p></div>}
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ProductAll;
